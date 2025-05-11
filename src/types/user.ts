
import { Course, Topic, CourseProgress } from './course';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  username?: string;
  avatar_url?: string;
  xp: number;
  level: number;
  xp_to_next_level: number;
  streak_days: number;
  last_active_date?: string;
  daily_challenge_streak?: number;
  best_challenge_streak?: number;
  last_daily_challenge_date?: string;
  total_paths_completed?: number;
  total_badges_earned?: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
}

// Re-export course related types
export type { Course, Topic, CourseProgress };

export interface CompletedProblem {
  id: string;
  user_id: string;
  problem_id: string;
  difficulty: string;
  completed_at: string;
  xp_gained?: number;
  xp_earned?: number; // Add this for backward compatibility
  course_id?: string;
  topic_id?: string;
  completion_time_seconds?: number;
  attempt_count?: number;
}

export interface XPHistory {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  description?: string;
  created_at: string;
}

// Achievement related types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  xp_reward: number;
  is_hidden: boolean;
  requirements?: Record<string, any>;
  icon?: string;
  category: string;
  tier?: string;
  achievement_category?: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
}

// Learning Path types
export type NodeType = "problem" | "tutorial" | "quiz" | "project";

export interface PathNode {
  id: string;
  path_id: string;
  title: string;
  description?: string;
  node_type: NodeType;
  prerequisite_nodes: string[];
  sequence_number: number;
  content_id?: string;
  xp_reward: number;
  created_at: string;
  updated_at: string;
}

export interface UserPathNodeProgress {
  id: string;
  user_id: string;
  node_id: string;
  completed_at: string;
  attempts: number;
}
