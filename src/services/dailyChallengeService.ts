
import { Problem } from '@/data/problems/types';
import { supabase } from '@/integrations/supabase/client';
import { DailyChallenge, UserDailyChallenge } from '@/types/user';

export async function getProblemById(id: string): Promise<Problem> {
  // In a real implementation, this would fetch from Supabase
  // For now, let's return a mock problem
  const mockProblem: Problem = {
    id,
    title: "Daily Challenge: String Reversal",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "Easy",
    starter_code: "def reverse_string(s):\n    # Write your code here\n    pass",
    testCases: [
      { input: "['h','e','l','l','o']", expected: "['o','l','l','e','h']", hidden: false },
      { input: "['H','a','n','n','a','h']", expected: "['h','a','n','n','a','H']", hidden: false }
    ],
    examples: [
      {
        input: "['h','e','l','l','o']",
        output: "['o','l','l','e','h']"
      },
      {
        input: "['H','a','n','n','a','h']",
        output: "['h','a','n','n','a','H']"
      }
    ],
    tags: ["String", "Two Pointers"],
    hints: ["Try using two pointers approach.", "Swap characters from outside to inside."],
    solution: "def reverse_string(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s",
    explanation: "This solution uses a two-pointer approach to swap characters from the outside towards the center of the string.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    signature_hint: "def reverse_string(s: list[str]) -> list[str]:"
  };
  
  return mockProblem;
}

export async function getDailyChallenges(): Promise<Problem[]> {
  // This would normally fetch from Supabase
  // For now, let's return a mock list
  const challenges: Problem[] = [
    {
      id: "daily-1",
      title: "Daily Challenge: String Reversal",
      description: "Write a function that reverses a string. The input string is given as an array of characters.",
      difficulty: "Easy",
      starter_code: "def reverse_string(s):\n    # Write your code here\n    pass",
      testCases: [],
      examples: [],
      tags: ["String", "Two Pointers"],
      hints: [],
      solution: "",
      explanation: "",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      signature_hint: "def reverse_string(s: list[str]) -> list[str]:"
    },
    {
      id: "daily-2",
      title: "Daily Challenge: Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy",
      starter_code: "def two_sum(nums, target):\n    # Write your code here\n    pass",
      testCases: [],
      examples: [],
      tags: ["Array", "Hash Table"],
      hints: [],
      solution: "",
      explanation: "",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      signature_hint: "def two_sum(nums: list[int], target: int) -> list[int]:"
    }
  ];
  
  return challenges;
}

// Added missing functions for DailyChallenges.tsx
export async function getTodaysChallenge(): Promise<DailyChallenge | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('challenge_date', today)
      .single();
    
    if (error) {
      // If no challenge for today, return null
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    
    return data as DailyChallenge;
  } catch (error) {
    console.error('Error getting today\'s challenge:', error);
    return null;
  }
}

export async function hasCompletedTodaysChallenge(userId: string): Promise<boolean> {
  try {
    // First get today's challenge
    const todaysChallenge = await getTodaysChallenge();
    if (!todaysChallenge) return false;
    
    // Check if the user has completed this challenge
    const { data, error } = await supabase
      .from('user_daily_challenges')
      .select('id')
      .eq('user_id', userId)
      .eq('challenge_id', todaysChallenge.id)
      .maybeSingle();
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error('Error checking challenge completion:', error);
    return false;
  }
}

export async function getUserChallengeStreak(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('daily_challenge_streak')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data?.daily_challenge_streak || 0;
  } catch (error) {
    console.error('Error fetching challenge streak:', error);
    return 0;
  }
}

export async function getUserChallengeHistory(userId: string): Promise<UserDailyChallenge[]> {
  try {
    const { data, error } = await supabase
      .from('user_daily_challenges')
      .select('*, challenge:challenge_id(*)')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    
    return data as UserDailyChallenge[];
  } catch (error) {
    console.error('Error fetching challenge history:', error);
    return [];
  }
}
