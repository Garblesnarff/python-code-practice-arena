
import { supabase } from '@/integrations/supabase/client';
import { CourseProgress } from '@/types/course';
import { getTopicsByCourseId, getProblemsByTopicId } from './course-data-service';

// Get course progress for a user
export const getCourseProgress = async (userId: string, courseId: string): Promise<CourseProgress | null> => {
  try {
    // In a production app, we would fetch from Supabase
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    
    if (error) {
      // If no record found, create one
      if (error.code === 'PGRST116') { // No rows returned
        return createCourseProgress(userId, courseId);
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching course progress for user ${userId}, course ${courseId}:`, error);
    return null;
  }
};

// Get all course progress for a user
export const getAllCourseProgress = async (userId: string): Promise<CourseProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // If no records found for some courses, create them
    const { getCourses } = await import('./course-data-service');
    const courses = await getCourses();
    const missingCourses = courses.filter(
      course => !data.some(progress => progress.course_id === course.id)
    );
    
    for (const course of missingCourses) {
      const newProgress = await createCourseProgress(userId, course.id);
      if (newProgress) {
        data.push(newProgress);
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching all course progress for user ${userId}:`, error);
    return [];
  }
};

// Create course progress record
export const createCourseProgress = async (userId: string, courseId: string): Promise<CourseProgress | null> => {
  try {
    // Count total problems for this course
    let totalProblems = 0;
    const topics = await getTopicsByCourseId(courseId);
    for (const topic of topics) {
      const problems = await getProblemsByTopicId(topic.id);
      totalProblems += problems.length;
    }
    
    const now = new Date().toISOString();
    
    const progressData = {
      user_id: userId,
      course_id: courseId,
      problems_completed: 0,
      total_problems: totalProblems,
      is_completed: false,
      last_accessed_timestamp: now,
      created_at: now,
      updated_at: now
    };
    
    const { data, error } = await supabase
      .from('course_progress')
      .insert(progressData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error creating course progress for user ${userId}, course ${courseId}:`, error);
    return null;
  }
};

// Update course progress after problem completion
export const updateCourseProgressAfterProblemCompletion = async (
  userId: string, 
  courseId: string,
  incrementCompleted = true
): Promise<CourseProgress | null> => {
  try {
    // Get current progress
    const progress = await getCourseProgress(userId, courseId);
    if (!progress) return null;
    
    // Increment problems completed if specified
    const problems_completed = incrementCompleted 
      ? progress.problems_completed + 1 
      : progress.problems_completed;
    
    // Check if course is now complete
    const is_completed = problems_completed >= progress.total_problems;
    
    // Update the record
    const { data, error } = await supabase
      .from('course_progress')
      .update({
        problems_completed,
        is_completed,
        last_accessed_timestamp: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', progress.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating course progress for user ${userId}, course ${courseId}:`, error);
    return null;
  }
};

// Mark a course as accessed (updates last_accessed_timestamp)
export const markCourseAsAccessed = async (userId: string, courseId: string): Promise<boolean> => {
  try {
    const progress = await getCourseProgress(userId, courseId);
    if (!progress) return false;
    
    const { error } = await supabase
      .from('course_progress')
      .update({
        last_accessed_timestamp: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', progress.id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error marking course ${courseId} as accessed for user ${userId}:`, error);
    return false;
  }
};

// This function will be an alias for markCourseAsAccessed to maintain compatibility
export const updateCourseLastAccessed = markCourseAsAccessed;
