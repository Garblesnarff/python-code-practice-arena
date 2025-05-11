// Your existing types exports but with updated CourseProgress type
export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: string;
  sequence_number: number;
  prerequisite_course_ids?: string[];
  learning_objectives?: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  sequence_number: number;
  created_at?: string;
  updated_at?: string;
}

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  problems_completed: number;
  total_problems: number;
  is_completed: boolean;
  last_accessed_timestamp: string;
  created_at: string;
  updated_at: string;
}

// If there are mock data interfaces/types, we should keep them
export interface MockData {
  courses: Course[];
  topics: Topic[];
  progress?: CourseProgress[];
}
