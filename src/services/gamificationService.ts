
import { supabase } from '@/integrations/supabase/client';
import { CompletedProblem, Achievement, UserAchievement } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { checkAndAwardBadges } from './badgeService';

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
  difficulty: string,
  courseId?: string,
  topicId?: string,
  bonusXp: number = 0
): Promise<{ success: boolean; xpGained: number; error?: any }> => {
  try {
    const xpGained = calculateXP(difficulty) + bonusXp;
    
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
        xp_earned: xpGained,
        course_id: courseId,
        topic_id: topicId
      });
      
    if (completionError) throw completionError;
    
    // 2. Update user XP - First fetch current XP
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('xp')
      .eq('id', userId)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Calculate new XP value and update
    const newXp = (profile?.xp || 0) + xpGained;
    
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ xp: newXp })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // 3. Check for first completed problem achievement
    await checkForFirstProblemAchievement(userId);
    
    // 4. Check for category completion achievements
    await checkForCategoryAchievements(userId);
    
    // 5. Check for badges that may be awarded
    await checkAndAwardBadges(userId);

    // Return success
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
      .select('*')
      .eq('is_hidden', false)
      .order('tier', { ascending: true })
      .order('name', { ascending: true });
      
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
    
    // Add XP for achievement - First, fetch current XP
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('xp')
      .eq('id', userId)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Calculate new XP value and update
    const newXp = (profile?.xp || 0) + achievement.xp_reward;
    
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ xp: newXp })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // Check for badges
    await checkAndAwardBadges(userId);
    
    return { success: true, xpGained: achievement.xp_reward };
  } catch (error) {
    console.error('Error awarding achievement:', error);
    return { success: false, xpGained: 0, error };
  }
};

// Check for first problem achievement
const checkForFirstProblemAchievement = async (userId: string) => {
  try {
    const { count } = await supabase
      .from('completed_problems')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (count === 1) {
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
    const { data: completedByDifficulty, error } = await supabase
      .from('completed_problems')
      .select('difficulty')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Count problems by difficulty
    const completedCounts: Record<string, number> = {};
    completedByDifficulty?.forEach(item => {
      completedCounts[item.difficulty] = (completedCounts[item.difficulty] || 0) + 1;
    });
    
    // Get total problems by difficulty
    const fundamentalsCount = 10; // Replace with actual counts from your data
    const easyCount = 15;
    const mediumCount = 20;
    
    const completedFundamentals = completedCounts['fundamentals'] || 0;
    const completedEasy = completedCounts['easy'] || 0;
    const completedMedium = completedCounts['medium'] || 0;
    
    // Check for achievements
    // Bronze tier achievements
    if (completedFundamentals >= 3) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Fundamentals Explorer')
        .eq('tier', 'Bronze')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (completedEasy >= 5) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Easy Problem Solver')
        .eq('tier', 'Bronze')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    // Silver tier achievements
    if (completedFundamentals >= fundamentalsCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Fundamentals Master')
        .eq('tier', 'Silver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (completedEasy >= easyCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Easy Conqueror')
        .eq('tier', 'Silver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (completedMedium >= 5) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Medium Challenger')
        .eq('tier', 'Silver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    // Gold tier achievements
    if (completedMedium >= mediumCount) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Medium Dominator')
        .eq('tier', 'Gold')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    // Total completion achievements
    const totalCompleted = completedByDifficulty?.length || 0;
    
    if (totalCompleted >= 10) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Rising Star')
        .eq('tier', 'Bronze')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (totalCompleted >= 25) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Problem Solving Expert')
        .eq('tier', 'Silver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (totalCompleted >= 50) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Python Virtuoso')
        .eq('tier', 'Gold')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (totalCompleted >= 100) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Python Master')
        .eq('tier', 'Platinum')
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
    
    // Check for consistency achievements
    if (newStreakDays >= 3) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Consistency I')
        .eq('achievement_category', 'Consistency')
        .eq('tier', 'Bronze')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (newStreakDays >= 7) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Consistency II')
        .eq('achievement_category', 'Consistency')
        .eq('tier', 'Silver')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (newStreakDays >= 30) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Consistency III')
        .eq('achievement_category', 'Consistency')
        .eq('tier', 'Gold')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
    
    if (newStreakDays >= 100) {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('name', 'Ultimate Consistency')
        .eq('achievement_category', 'Consistency')
        .eq('tier', 'Platinum')
        .single();
      
      if (achievement) {
        await awardAchievement(userId, achievement.id);
      }
    }
  } catch (error) {
    console.error('Error updating login streak:', error);
  }
};

// Direct XP addition function
export const addUserXP = async (
  userId: string,
  amount: number
): Promise<{ success: boolean; error?: any }> => {
  try {
    // First, fetch current XP
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('xp')
      .eq('id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Calculate new XP value
    const newXp = (profile?.xp || 0) + amount;
    
    // Update with new value
    const { error } = await supabase
      .from('user_profiles')
      .update({ xp: newXp })
      .eq('id', userId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error adding XP:', error);
    return { success: false, error };
  }
};

// Check if first attempt at solving a problem
export const isFirstAttempt = async (userId: string, problemId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('completed_problems')
      .select('*')
      .eq('user_id', userId)
      .eq('problem_id', problemId);
    
    if (error) throw error;
    return !data || data.length === 0;
  } catch (error) {
    console.error('Error checking first attempt:', error);
    return false;
  }
};

// Record problem attempt count
export const recordProblemAttempt = async (
  userId: string, 
  problemId: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Check if problem already exists
    const { data: existingProblem } = await supabase
      .from('completed_problems')
      .select('*')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .single();
    
    if (existingProblem) {
      // Update attempt count
      const { error } = await supabase
        .from('completed_problems')
        .update({ 
          attempt_count: (existingProblem.attempt_count || 1) + 1 
        })
        .eq('id', existingProblem.id);
      
      if (error) throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error recording problem attempt:', error);
    return { success: false, error };
  }
};
