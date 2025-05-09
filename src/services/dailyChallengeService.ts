
import { supabase } from '@/integrations/supabase/client';
import { Problem } from '@/data/problems/types';
import { DailyChallenge } from '@/types/dailyChallenge';

// Sample daily challenge
const sampleChallenge: Problem = {
  id: 'daily-01',
  title: 'Sum of Numbers',
  description: 'Write a function that returns the sum of two numbers.',
  difficulty: 'easy',
  hints: [
    'Use the + operator to add numbers',
    'Remember to return the result'
  ],
  starter_code: 'def sum_numbers(a, b):\n    # Your code here\n    pass',
  solution_code: 'def sum_numbers(a, b):\n    return a + b',
  test_cases: [
    {
      input: [1, 2],
      expected_output: 3,
    },
    {
      input: [5, 5],
      expected_output: 10,
    },
    {
      input: [-1, 1],
      expected_output: 0,
    },
    {
      input: [0, 0],
      expected_output: 0,
    },
  ],
  examples: [
    {
      input: [2, 3],
      expected_output: 5,
    },
    {
      input: [10, 20],
      expected_output: 30,
    },
  ],
  time_complexity: 'O(1)',
  space_complexity: 'O(1)',
};

/**
 * Fetches today's daily challenge
 */
export const getDailyChallenges = async (): Promise<Problem> => {
  try {
    // In a real implementation, we would fetch from the database
    // For now, return a sample challenge
    return {
      id: 'daily-01',
      title: 'Sum of Numbers',
      description: 'Write a function that returns the sum of two numbers.',
      difficulty: 'easy',
      hints: [
        'Use the + operator to add numbers',
        'Remember to return the result'
      ],
      starter_code: 'def sum_numbers(a, b):\n    # Your code here\n    pass',
      solution_code: 'def sum_numbers(a, b):\n    return a + b',
      test_cases: [
        {
          input: [1, 2],
          expected_output: 3,
        },
        {
          input: [5, 5],
          expected_output: 10,
        },
        {
          input: [-1, 1],
          expected_output: 0,
        },
        {
          input: [0, 0],
          expected_output: 0,
        },
      ],
      examples: [
        {
          input: [2, 3],
          expected_output: 5,
        },
        {
          input: [10, 20],
          expected_output: 30,
        },
      ],
      time_complexity: 'O(1)',
      space_complexity: 'O(1)',
    };
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    throw error;
  }
};

// Fix the user achievements type mismatch in Profile.tsx by updating the UserAchievement interface in user.ts:

<lov-write file_path="src/types/user.ts">
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
  category: "Problem Solving" | "Consistency" | "Speed" | "Accuracy" | "Milestone" | "Specialty" | "Mastery";
  xp_reward: number;
  achievement_category: "Problem Solving" | "Consistency" | "Speed" | "Accuracy" | "Milestone" | "Specialty" | "Mastery";
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

// Fix the PathNode type for learningPathService
export type NodeType = "Problem" | "Concept" | "Quiz" | "Project";

export interface PathNode {
  id: string;
  path_id: string;
  prerequisite_nodes: string[];
  sequence_number: number;
  xp_reward: number;
  created_at: string;
  updated_at: string;
  node_type: NodeType;
  content_id: string | null;
  title: string;
  description: string | null;
}

export interface UserPathNodeProgress {
  id: string;
  user_id: string;
  node_id: string;
  completed_at: string;
  attempts: number;
  node?: PathNode;
}
