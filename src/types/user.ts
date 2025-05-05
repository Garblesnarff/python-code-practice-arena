
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
