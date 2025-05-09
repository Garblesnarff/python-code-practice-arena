
import { supabase } from '@/integrations/supabase/client';
import { DailyChallenge, UserDailyChallenge } from '@/types/user';
import { completeProblem } from './gamificationService';
import { checkAndAwardBadges } from './badgeService';

// Get today's daily challenge
export const getTodaysChallenge = async (): Promise<DailyChallenge | null> => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('challenge_date', today)
      .single();
      
    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116: No rows returned
        console.error('Error fetching daily challenge:', error);
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    return null;
  }
};

// Check if user has completed today's challenge
export const hasCompletedTodaysChallenge = async (userId: string): Promise<boolean> => {
  try {
    const challenge = await getTodaysChallenge();
    if (!challenge) return false;
    
    const { data, error } = await supabase
      .from('user_daily_challenges')
      .select('*')
      .eq('user_id', userId)
      .eq('challenge_id', challenge.id)
      .single();
      
    if (error) {
      if (error.code !== 'PGRST116') { // No rows returned
        console.error('Error checking challenge completion:', error);
      }
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking challenge completion:', error);
    return false;
  }
};

// Complete a daily challenge
export const completeDailyChallenge = async (
  userId: string,
  challengeId: string, 
  timeTakenSeconds?: number
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Get the challenge details
    const { data: challenge, error: challengeError } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('id', challengeId)
      .single();
      
    if (challengeError) throw challengeError;
    if (!challenge) throw new Error('Challenge not found');
    
    // Check if already completed
    const { data: existingCompletion } = await supabase
      .from('user_daily_challenges')
      .select('*')
      .eq('user_id', userId)
      .eq('challenge_id', challengeId)
      .single();
      
    if (existingCompletion) {
      return { success: true }; // Already completed
    }
    
    // Create completion record
    const { error } = await supabase
      .from('user_daily_challenges')
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        time_taken_seconds: timeTakenSeconds
      });
      
    if (error) throw error;
    
    // Also mark the problem as completed with bonus XP
    await completeProblem(
      userId, 
      challenge.problem_id, 
      challenge.difficulty,
      undefined,
      undefined,
      challenge.bonus_xp
    );
    
    // Check for streak-based badges
    await checkAndAwardBadges(userId);
    
    return { success: true };
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    return { success: false, error };
  }
};

// Get user's recent daily challenge streak
export const getUserChallengeStreak = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('daily_challenge_streak')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data?.daily_challenge_streak || 0;
  } catch (error) {
    console.error('Error getting challenge streak:', error);
    return 0;
  }
};

// Get user's best challenge streak
export const getUserBestChallengeStreak = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('best_challenge_streak')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data?.best_challenge_streak || 0;
  } catch (error) {
    console.error('Error getting best challenge streak:', error);
    return 0;
  }
};

// Get user's challenge history (last 30 days)
export const getUserChallengeHistory = async (userId: string): Promise<UserDailyChallenge[]> => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data, error } = await supabase
      .from('user_daily_challenges')
      .select('*, challenge:daily_challenges(*)')
      .eq('user_id', userId)
      .gte('completed_at', thirtyDaysAgo.toISOString())
      .order('completed_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching challenge history:', error);
    return [];
  }
};
