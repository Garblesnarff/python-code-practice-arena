
import { supabase } from '@/integrations/supabase/client';
import { Course, Topic } from '@/types/course';
import { Problem } from '@/data/problems/types';
import { course1Problems } from '@/data/problems/course-1-problems';
import { course2Problems } from '@/data/problems/course-2-problems';

// Get all courses from Supabase
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

// Get a single course by ID from Supabase
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();
    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    return null;
  }
};

// Get topics for a course from Supabase
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
    console.error(`Error fetching topics for course ${courseId}:`, error);
    return [];
  }
};

// Get a single topic by ID from Supabase
export const getTopicById = async (topicId: string): Promise<Topic | null> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .maybeSingle();
    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return null;
  }
};

// Get problems for a topic
export const getProblemsByTopicId = async (topicId: string): Promise<Problem[]> => {
  try {
    const allProblems = [...course1Problems, ...course2Problems];
    return allProblems.filter(problem => problem.topic_id === topicId);
  } catch (error) {
    console.error(`Error fetching problems for topic ${topicId}:`, error);
    return [];
  }
};

// Get a single problem by ID
export const getProblemById = async (problemId: string): Promise<Problem | null> => {
  try {
    const allProblems = [...course1Problems, ...course2Problems];
    const problem = allProblems.find(p => p.id === problemId);
    return problem || null;
  } catch (error) {
    console.error(`Error fetching problem ${problemId}:`, error);
    return null;
  }
};

