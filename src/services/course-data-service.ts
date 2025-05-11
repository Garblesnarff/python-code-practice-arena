import { supabase } from '@/integrations/supabase/client';
import { Course, Topic } from '@/types/course';
import { Problem } from '@/data/problems/types';
import { mockCourses, mockTopics } from './mock-course-data';
import { course1Problems } from '@/data/problems/course-1-problems';
import { course2Problems } from '@/data/problems/course-2-problems';

// Get all courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    // In a production app, we would fetch courses from Supabase
    // const { data, error } = await supabase.from('courses').select('*').order('sequence_number');
    // if (error) throw error;
    // return data;
    
    // For now, return mock courses
    return mockCourses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// Get a single course by ID
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    // In a production app, we would fetch from Supabase
    // const { data, error } = await supabase
    //   .from('courses')
    //   .select('*')
    //   .eq('id', courseId)
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // For now, return the mock course
    const course = mockCourses.find(c => c.id === courseId);
    return course || null;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    return null;
  }
};

// Get topics for a course
export const getTopicsByCourseId = async (courseId: string): Promise<Topic[]> => {
  try {
    // In a production app, we would fetch from Supabase
    // const { data, error } = await supabase
    //   .from('topics')
    //   .select('*')
    //   .eq('course_id', courseId)
    //   .order('sequence_number');
    
    // if (error) throw error;
    // return data;
    
    // For now, filter mock topics by course ID
    return mockTopics.filter(topic => topic.course_id === courseId);
  } catch (error) {
    console.error(`Error fetching topics for course ${courseId}:`, error);
    return [];
  }
};

// Get a single topic by ID
export const getTopicById = async (topicId: string): Promise<Topic | null> => {
  try {
    // In a production app, we would fetch from Supabase
    // Instead, search through our mock topics array
    const topic = mockTopics.find(t => t.id === topicId);
    return topic || null;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return null;
  }
};

// Get problems for a topic
export const getProblemsByTopicId = async (topicId: string): Promise<Problem[]> => {
  try {
    // In a production app, we would fetch from Supabase
    // Instead, we'll filter our local problems data
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
    // In a production app, we would fetch from Supabase
    // Instead, we'll look through our local problems
    const allProblems = [...course1Problems, ...course2Problems];
    const problem = allProblems.find(p => p.id === problemId);
    return problem || null;
  } catch (error) {
    console.error(`Error fetching problem ${problemId}:`, error);
    return null;
  }
};
