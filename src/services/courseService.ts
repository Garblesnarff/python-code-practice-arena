
import { supabase } from '@/integrations/supabase/client';
import { Course, CourseProgress, Topic } from '@/types/user';
import { Problem } from '@/data/problems/types';
import { course1Problems } from '@/data/problems/course-1-problems';
import { course2Problems } from '@/data/problems/course-2-problems';

// Mock course data for demonstration purposes
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Python Foundations for Beginners',
    description: 'Learn the fundamental concepts of Python programming, including variables, data types, and basic control structures.',
    icon: 'Blocks',
    sequence_number: 1,
    prerequisite_course_ids: [],
    learning_objectives: [
      'Understand Python variables and data types',
      'Work with conditional statements',
      'Write basic Python functions',
      'Perform input/output operations'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-2',
    title: 'Learning Simple Data Structures in Python',
    description: 'Dive into Python data structures like lists, dictionaries, tuples, and sets to organize and manage your data effectively.',
    icon: 'Collection',
    sequence_number: 2,
    prerequisite_course_ids: ['course-1'],
    learning_objectives: [
      'Master Python lists and list operations',
      'Use dictionaries for key-value data',
      'Work with tuples and sets',
      'Choose appropriate data structures for different problems'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-3',
    title: 'Control Flow and Functions',
    description: 'Learn about loops, functions, and how to control the flow of your Python programs.',
    icon: 'Braces',
    sequence_number: 3,
    prerequisite_course_ids: ['course-2'],
    learning_objectives: [
      'Work with for and while loops',
      'Create reusable functions',
      'Use parameters and return values',
      'Master scope and namespaces'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-4',
    title: 'Object-Oriented Programming',
    description: 'Discover the principles of object-oriented programming in Python using classes and objects.',
    sequence_number: 4,
    prerequisite_course_ids: ['course-3'],
    learning_objectives: [
      'Create classes and objects',
      'Implement inheritance and polymorphism',
      'Use encapsulation and abstraction',
      'Design effective class hierarchies'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-5',
    title: 'File Operations and Error Handling',
    description: 'Learn to work with files and handle errors gracefully in your Python programs.',
    sequence_number: 5,
    prerequisite_course_ids: ['course-3'],
    learning_objectives: [
      'Read from and write to files',
      'Use different file formats (text, CSV, JSON)',
      'Implement try-except blocks',
      'Create robust error handling strategies'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-6',
    title: 'Intermediate Data Structures and Algorithms',
    description: 'Build upon your knowledge with more complex data structures and fundamental algorithms.',
    sequence_number: 6,
    prerequisite_course_ids: ['course-4', 'course-5'],
    learning_objectives: [
      'Implement stacks, queues, and linked lists',
      'Learn sorting and searching algorithms',
      'Analyze algorithm complexity',
      'Solve problems with appropriate algorithms'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-7',
    title: 'Advanced Python Concepts',
    description: 'Master advanced Python features like decorators, generators, and context managers.',
    sequence_number: 7,
    prerequisite_course_ids: ['course-6'],
    learning_objectives: [
      'Use decorators and closures',
      'Implement generators and iterators',
      'Work with context managers',
      'Apply functional programming concepts'
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

// Mock topics data
const mockTopics: Record<string, Topic[]> = {
  'course-1': [
    {
      id: 'topic-basics',
      title: 'Python Basics',
      description: 'Introduction to Python variables, data types, and basic operations',
      course_id: 'course-1',
      sequence_number: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'topic-conditionals',
      title: 'Conditional Statements',
      description: 'Working with if, else, and elif statements in Python',
      course_id: 'course-1',
      sequence_number: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  'course-2': [
    {
      id: 'topic-lists',
      title: 'Lists',
      description: 'Working with Python lists and list operations',
      course_id: 'course-2',
      sequence_number: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'topic-dictionaries',
      title: 'Dictionaries',
      description: 'Using Python dictionaries for key-value data',
      course_id: 'course-2',
      sequence_number: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'topic-tuples-sets',
      title: 'Tuples and Sets',
      description: 'Working with Python tuples and sets',
      course_id: 'course-2',
      sequence_number: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

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
    
    // For now, return mock topics
    return mockTopics[courseId] || [];
  } catch (error) {
    console.error(`Error fetching topics for course ${courseId}:`, error);
    return [];
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
const createCourseProgress = async (userId: string, courseId: string): Promise<CourseProgress | null> => {
  try {
    // Count total problems for this course
    let totalProblems = 0;
    const topics = await getTopicsByCourseId(courseId);
    for (const topic of topics) {
      const problems = await getProblemsByTopicId(topic.id);
      totalProblems += problems.length;
    }
    
    const progressData: Partial<CourseProgress> = {
      user_id: userId,
      course_id: courseId,
      problems_completed: 0,
      total_problems: totalProblems,
      is_completed: false,
      last_accessed_timestamp: new Date().toISOString()
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
