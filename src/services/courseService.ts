
import { supabase } from '@/integrations/supabase/client';
import { Course, Topic, CourseProgress } from '@/types/user';

// Get all courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('sequence_number');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// Get a single course by ID
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

// Get topics for a course
export const getTopicsByCourseId = async (courseId: string): Promise<Topic[]> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('course_id', courseId)
      .order('sequence_number');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

// Get progress for user in a course
export const getCourseProgress = async (userId: string, courseId: string): Promise<CourseProgress | null> => {
  try {
    // First check if progress record exists
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error;
    }
    
    if (data) {
      return data;
    } else {
      // Create a new progress record
      const { data: newProgress, error: insertError } = await supabase
        .from('course_progress')
        .insert({
          user_id: userId,
          course_id: courseId,
          problems_completed: 0,
          total_problems: 0
        })
        .select()
        .single();
        
      if (insertError) throw insertError;
      return newProgress;
    }
  } catch (error) {
    console.error('Error with course progress:', error);
    return null;
  }
};

// Get progress for all courses for a user
export const getAllCourseProgress = async (userId: string): Promise<CourseProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all course progress:', error);
    return [];
  }
};

// Update last accessed timestamp for a course
export const updateCourseLastAccessed = async (userId: string, courseId: string): Promise<void> => {
  try {
    await supabase
      .from('course_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        last_accessed_timestamp: new Date().toISOString()
      }, {
        onConflict: 'user_id,course_id'
      });
  } catch (error) {
    console.error('Error updating course last accessed:', error);
  }
};

// Update course progress after completing a problem
export const updateCourseProgressAfterProblemCompletion = async (
  userId: string, 
  courseId: string,
  isNewCompletion: boolean
): Promise<void> => {
  try {
    if (!isNewCompletion) return;
    
    // Get current progress
    const { data: progress, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        // Create a new progress record with 1 problem completed
        await supabase
          .from('course_progress')
          .insert({
            user_id: userId,
            course_id: courseId,
            problems_completed: 1
          });
      } else {
        throw error;
      }
    } else {
      // Update existing record
      await supabase
        .from('course_progress')
        .update({
          problems_completed: (progress.problems_completed || 0) + 1,
          is_completed: progress.problems_completed + 1 >= progress.total_problems && progress.total_problems > 0
        })
        .eq('id', progress.id);
    }
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
};
