import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Type definitions
export type Achievement = {
  id: string;
  name: string;
  description: string;
  category: string;
  achievement_category: string;
  icon: string;
  tier: string;
  requirements: Json;
  xp_reward: number;
  is_hidden: boolean;
};

export type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement: Achievement;
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
      .from('user_stats')
      .select('total_xp')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data?.total_xp || 0;
  } catch (error) {
    console.error('Error fetching user XP:', error);
    return 0;
  }
}

export async function getUserLevel(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('level')
      .eq('user_id', userId)
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
      .from('user_stats')
      .select('current_streak')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data?.current_streak || 0;
  } catch (error) {
    console.error('Error fetching user streak:', error);
    return 0;
  }
}

export async function updateUserStreak(userId: string): Promise<boolean> {
  try {
    // First, get the current streak and last activity date
    const { data: userData, error: fetchError } = await supabase
      .from('user_stats')
      .select('current_streak, last_activity_date')
      .eq('user_id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const now = new Date();
    const lastActivity = userData?.last_activity_date ? new Date(userData.last_activity_date) : null;
    let newStreak = userData?.current_streak || 0;
    
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
      .from('user_stats')
      .update({
        current_streak: newStreak,
        last_activity_date: new Date().toISOString()
      })
      .eq('user_id', userId);
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error updating user streak:', error);
    return false;
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
      .from('user_stats')
      .select('total_xp, level')
      .eq('user_id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const currentXP = userData?.total_xp || 0;
    const currentLevel = userData?.level || 1;
    const newXP = currentXP + amount;
    const newLevel = calculateLevelFromXP(newXP);
    
    // Update the user's XP
    const { error: updateError } = await supabase
      .from('user_stats')
      .update({
        total_xp: newXP,
        level: newLevel
      })
      .eq('user_id', userId);
    
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
