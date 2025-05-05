
import { supabase } from '@/integrations/supabase/client';
import { CompletedProblem, Achievement, UserAchievement } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

// Calculate XP based on problem difficulty
export const calculateXP = (difficulty: string): number => {
  switch (difficulty.toLowerCase()) {
    case 'fundamentals':
      return 20;
    case 'easy':
      return 50;
    case 'medium':
      return 100;
    case 'hard':
      return 200;
    default:
      return 10;
  }
};

// Mark a problem as completed and award XP
export const completeProblem = async (
  userId: string,
  problemId: string,
  difficulty: string
): Promise<{ success: boolean; xpGained: number; error?: any }> => {
  try {
    const xpGained = calculateXP(difficulty);
    
    // Check if problem already completed
    const { data: existingCompletion } = await supabase
      .from('completed_problems')
      .select('*')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .single();
    
    if (existingCompletion) {
      return { success: true, xpGained: 0 }; // Problem already completed
    }
    
    // Begin transaction
    // 1. Insert completed problem
    const { error: completionError } = await supabase
      .from('completed_problems')
      .insert({
        user_id: userId,
        problem_id: problemId,
        difficulty: difficulty,
        xp_earned: xpGained
      });
      
    if (completionError) throw completionError;
    
    // 2. Update user XP
    const { error: updateError } = await supabase.rpc('add_user_xp', {
      user_id: userId,
      xp_amount: xpGained
    });
    
    if (updateError) throw updateError;
    
    // 3. Check for first completed problem achievement
    await checkForFirstProblemAchievement(userId);
    
    // 4. Check for category completion achievements
    await checkForCategoryAchievements(userId);
    
    return { success: true, xpGained };
  } catch (error) {
    console.error('Error completing problem:', error);
    return { success: false, xpGained: 0, error };
  }
};

// Get user's completed problems
export const getCompletedProblems = async (userId: string): Promise<CompletedProblem[]> => {
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
};

// Get user's achievements
export const getUserAchievements = async (userId: string): Promise<UserAchievement[]> => {
  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*, achievement:achievements(*)')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
};

// Get all achievements
export const getAllAchievements = async (): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

// Award an achievement to a user
export const awardAchievement = async (
  userId: string,
  achievementId: string
): Promise<{ success: boolean; xpGained: number; error?: any }> => {
  try {
    // Check if achievement already awarded
    const { data: existingAchievement } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .single();
    
    if (existingAchievement) {
      return { success: true, xpGained: 0 }; // Achievement already awarded
    }
    
    // Get achievement to determine XP reward
    const { data: achievement, error: achievementError } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single();
    
    if (achievementError) throw achievementError;
    
    // Award achievement
    const { error: awardError } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId
      });
    
    if (awardError) throw awardError;
    
    // Add XP for achievement
    const { error: updateError } = await supabase.rpc('add_user_xp', {
      user_id: userId,
      xp_amount: achievement.xp_reward
    });
    
    if (updateError) throw updateError;
    
    return { success: true, xpGained: achievement.xp_reward };
  } catch (error) {
    console.error('Error awarding achievement:', error);
    return { success: false, xpGained: 0, error };
  }
};

// Check for first problem achievement
const checkForFirstProblemAchievement = async (userId: string) => {
  try {
    const { data: problems } = await supabase
      .from('completed_problems')
      .select('count')
      .eq('user_id', userId);
    
    if ((problems?.[0]?.count || 0) === 1) {
      // Get "First Steps" achievement
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'First Steps')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
  } catch (error) {
    console.error('Error checking for first problem achievement:', error);
  }
};

// Check for category completion achievements
const checkForCategoryAchievements = async (userId: string) => {
  try {
    // Get completed problems by difficulty
    const { data: completedCounts, error } = await supabase
      .from('completed_problems')
      .select('difficulty, count')
      .eq('user_id', userId)
      .group('difficulty');
    
    if (error) throw error;
    
    // Get total problems by difficulty
    const fundamentalsCount = 10; // Replace with actual counts from your data
    const easyCount = 15;
    const mediumCount = 20;
    
    const completedFundamentals = completedCounts?.find(d => d.difficulty === 'fundamentals')?.count || 0;
    const completedEasy = completedCounts?.find(d => d.difficulty === 'easy')?.count || 0;
    const completedMedium = completedCounts?.find(d => d.difficulty === 'medium')?.count || 0;
    
    // Check for achievements
    if (completedFundamentals >= fundamentalsCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Fundamentals Master')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (completedEasy >= easyCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Easy Solver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (completedMedium >= mediumCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Medium Challenger')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
  } catch (error) {
    console.error('Error checking for category achievements:', error);
  }
};

// Update user's login streak
export const updateLoginStreak = async (userId: string): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('last_active_date, streak_days')
      .eq('id', userId)
      .single();
    
    if (profileError) throw profileError;
    
    let newStreakDays = profile.streak_days || 0;
    
    if (!profile.last_active_date) {
      // First login
      newStreakDays = 1;
    } else {
      const lastActive = new Date(profile.last_active_date);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
        // User was active yesterday, increment streak
        newStreakDays += 1;
      } else if (lastActive.toISOString().split('T')[0] === today) {
        // User already logged in today
        return;
      } else {
        // Streak broken
        newStreakDays = 1;
      }
    }
    
    // Update streak and last active date
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        streak_days: newStreakDays,
        last_active_date: today
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // Check for streak achievements
    if (newStreakDays === 3 || newStreakDays === 7 || newStreakDays === 30) {
      const achievementName = newStreakDays === 3 
        ? 'Consistency I' 
        : newStreakDays === 7 
          ? 'Consistency II' 
          : 'Consistency III';
      
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', achievementName)
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
  } catch (error) {
    console.error('Error updating login streak:', error);
  }
};

// RPC function to safely add XP to user
export const addUserXP = async (
  userId: string,
  amount: number
): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase.rpc('add_user_xp', {
      user_id: userId,
      xp_amount: amount
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error adding XP:', error);
    return { success: false, error };
  }
};
