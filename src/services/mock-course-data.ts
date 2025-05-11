import { Course, Topic, MockData } from '@/types/course';

// Mock course data for demonstration purposes
export const mockCourses: Course[] = [
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

// Mock topics data - convert from Record to flat array to match expected type
export const mockTopics: Topic[] = [
  // Topics for course-1
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
  },
  // Topics for course-2
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
];

export const getMockData = (): MockData => {
  return {
    courses: mockCourses,
    topics: mockTopics
  };
};
