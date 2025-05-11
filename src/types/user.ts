
import { Course, Topic, CourseProgress } from './course';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
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
  xp_gained: number;
}

export interface XPHistory {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  description?: string;
  created_at: string;
}
