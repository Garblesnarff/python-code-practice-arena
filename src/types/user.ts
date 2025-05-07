
export interface UserProfile {
  id: string;
  username: string;
  level: number;
  xp: number;
  xp_to_next_level: number;
  streak_days: number;
  last_active_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompletedProblem {
  id: string;
  user_id: string;
  problem_id: string;
  difficulty: string;
  xp_earned: number;
  completed_at: string;
  course_id?: string;
  topic_id?: string;
  completion_time_seconds?: number;
  attempt_count?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  category: string;
  xp_reward: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: string;
  sequence_number: number;
  prerequisite_course_ids?: string[];
  learning_objectives?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  sequence_number: number;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  last_accessed_timestamp: string;
  problems_completed: number;
  total_problems: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}
