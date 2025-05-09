
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
  daily_challenge_streak?: number;
  best_challenge_streak?: number;
  last_daily_challenge_date?: string;
  total_badges_earned?: number;
  total_paths_completed?: number;
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
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  achievement_category: 'Problem Solving' | 'Consistency' | 'Speed' | 'Accuracy' | 'Milestone' | 'Specialty' | 'Mastery';
  is_hidden: boolean;
  requirements?: any;
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

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  category: 'Skill' | 'Rank' | 'Challenge';
  subcategory: string | null;
  requirements?: any;
  is_seasonal: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  showcased: boolean | null;
  badge?: Badge;
}

export interface DailyChallenge {
  id: string;
  problem_id: string;
  difficulty: string;
  bonus_xp: number;
  challenge_date: string;
  created_at: string;
}

export interface UserDailyChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  completed_at: string;
  time_taken_seconds: number | null;
  challenge?: DailyChallenge;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  category: string;
  difficulty: string;
  sequence_number: number;
  prerequisite_paths: string[] | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface PathNode {
  id: string;
  path_id: string;
  title: string;
  description: string | null;
  node_type: 'Problem' | 'Concept' | 'Quiz' | 'Project';
  content_id: string | null;
  prerequisite_nodes: string[] | null;
  sequence_number: number;
  xp_reward: number;
  created_at: string;
  updated_at: string;
}

export interface UserPathProgress {
  id: string;
  user_id: string;
  path_id: string;
  nodes_completed: string[] | null;
  is_completed: boolean | null;
  last_accessed: string | null;
  created_at: string;
  updated_at: string;
  path?: LearningPath;
}

export interface UserPathNodeProgress {
  id: string;
  user_id: string;
  node_id: string;
  completed_at: string;
  attempts: number | null;
  node?: PathNode;
}
