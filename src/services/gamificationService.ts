
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { CompletedProblem } from '@/types/user';

// Type definitions
export type Achievement = {
  id: string;
  name: string;
  description: string;
  category: string;
  achievement_category: string;
  icon: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  requirements: Json;
  xp_reward: number;
  is_hidden: boolean;
};

export type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
};

export type XPNotification = {
  amount: number;
  reason: string;
  timestamp: Date;
};

export type LevelUpNotification = {
  newLevel: number;
  timestamp: Date;
};

// User XP & Level
export async function getUserXP(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('xp')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data?.xp || 0;
  } catch (error) {
    console.error('Error fetching user XP:', error);
    return 0;
  }
}

export async function getUserLevel(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('level')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data?.level || 1;
  } catch (error) {
    console.error('Error fetching user level:', error);
    return 1;
  }
}

export function calculateLevelFromXP(xp: number): number {
  // Simple level calculation: level = sqrt(xp / 100) + 1
  // This makes level progression require increasing XP amounts
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function calculateXPForNextLevel(currentLevel: number): number {
  // Calculate XP needed for next level: (nextLevel-1)^2 * 100
  return Math.pow(currentLevel, 2) * 100;
}

// Streaks & Daily Challenges
export async function getUserStreak(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('streak_days')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data?.streak_days || 0;
  } catch (error) {
    console.error('Error fetching user streak:', error);
    return 0;
  }
}

export async function updateUserStreak(userId: string): Promise<boolean> {
  try {
    // First, get the current streak and last activity date
    const { data: userData, error: fetchError } = await supabase
      .from('user_profiles')
      .select('streak_days, last_active_date')
      .eq('id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const now = new Date();
    const lastActivity = userData?.last_active_date ? new Date(userData.last_active_date) : null;
    let newStreak = userData?.streak_days || 0;
    
    // If last activity was yesterday, increment streak
    if (lastActivity) {
      const timeDiff = now.getTime() - lastActivity.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Last activity was yesterday, increment streak
        newStreak += 1;
      } else if (daysDiff > 1) {
        // More than a day has passed, reset streak
        newStreak = 1;
      }
      // If daysDiff === 0, same day, keep streak the same
    } else {
      // First activity ever, start streak at 1
      newStreak = 1;
    }
    
    // Update the streak and last activity date
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        streak_days: newStreak,
        last_active_date: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error updating user streak:', error);
    return false;
  }
}

// Completed Problems
export async function getCompletedProblems(userId: string): Promise<CompletedProblem[]> {
  try {
    const { data, error } = await supabase
      .from('completed_problems')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching completed problems:', error);
    return [];
  }
}

// Achievements
export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*, achievement:achievements(*)')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    // Type assertion to ensure data matches the expected structure
    return data as UserAchievement[];
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
}

// XP Operations
export async function awardXPToUser(
  userId: string, 
  amount: number, 
  reason: string
): Promise<{ success: boolean, notification?: XPNotification, levelUp?: LevelUpNotification }> {
  try {
    // Get current XP and level
    const { data: userData, error: fetchError } = await supabase
      .from('user_profiles')
      .select('xp, level')
      .eq('id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const currentXP = userData?.xp || 0;
    const currentLevel = userData?.level || 1;
    const newXP = currentXP + amount;
    const newLevel = calculateLevelFromXP(newXP);
    
    // Update the user's XP
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        xp: newXP,
        level: newLevel
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // Create XP notification
    const xpNotification: XPNotification = {
      amount,
      reason,
      timestamp: new Date()
    };
    
    // Check if user leveled up
    let levelUpNotification: LevelUpNotification | undefined;
    if (newLevel > currentLevel) {
      levelUpNotification = {
        newLevel,
        timestamp: new Date()
      };
    }
    
    return { 
      success: true, 
      notification: xpNotification,
      levelUp: levelUpNotification
    };
  } catch (error) {
    console.error('Error awarding XP:', error);
    return { success: false };
  }
}

// Problem completion
export async function completeProblem(
  userId: string,
  problemId: string,
  difficulty: string,
  courseId?: string,
  topicId?: string
): Promise<{ success: boolean, xpGained: number }> {
  try {
    // Determine XP based on difficulty
    let xpGained = 0;
    switch (difficulty.toLowerCase()) {
      case 'fundamentals':
        xpGained = 10;
        break;
      case 'easy':
        xpGained = 20;
        break;
      case 'medium':
        xpGained = 40;
        break;
      case 'hard':
        xpGained = 80;
        break;
      default:
        xpGained = 30; // Default
    }
    
    // Record the completion
    const { error: insertError } = await supabase
      .from('completed_problems')
      .insert({
        user_id: userId,
        problem_id: problemId,
        difficulty,
        xp_earned: xpGained,
        course_id: courseId,
        topic_id: topicId,
        completed_at: new Date().toISOString()
      });
    
    if (insertError) throw insertError;
    
    // Award XP to user
    const awardResult = await awardXPToUser(userId, xpGained, `Completed ${difficulty} problem`);
    
    if (!awardResult.success) {
      throw new Error('Failed to award XP');
    }
    
    return { success: true, xpGained };
  } catch (error) {
    console.error('Error completing problem:', error);
    return { success: false, xpGained: 0 };
  }
}
