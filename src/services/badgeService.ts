
import { supabase } from '@/integrations/supabase/client';
import { Badge, UserBadge } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

// Fetch all available badges
export const getAllBadges = async (): Promise<Badge[]> => {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching badges:', error);
    return [];
  }
};

// Get user's earned badges
export const getUserBadges = async (userId: string): Promise<UserBadge[]> => {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
};

// Get user's showcased badges
export const getUserShowcasedBadges = async (userId: string): Promise<UserBadge[]> => {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId)
      .eq('showcased', true);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching showcased badges:', error);
    return [];
  }
};

// Award a badge to a user
export const awardBadge = async (
  userId: string,
  badgeId: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Check if badge already awarded
    const { data: existingBadge } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .single();
    
    if (existingBadge) {
      return { success: true }; // Badge already awarded
    }
    
    // Award badge
    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId,
      });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error awarding badge:', error);
    return { success: false, error };
  }
};

// Toggle showcase status of a badge
export const toggleShowcaseBadge = async (
  userBadgeId: string,
  showcased: boolean
): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('user_badges')
      .update({ showcased })
      .eq('id', userBadgeId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error toggling badge showcase status:', error);
    return { success: false, error };
  }
};

// Check badges based on achievements, problem completions, etc.
export const checkAndAwardBadges = async (userId: string): Promise<void> => {
  try {
    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!profile) return;
    
    // Get user achievements
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId);
      
    // Get user completed problems
    const { data: completedProblems } = await supabase
      .from('completed_problems')
      .select('*')
      .eq('user_id', userId);
    
    // Check for skill badges based on problem completions
    if (completedProblems && completedProblems.length >= 5) {
      const { data: beginnerBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Python Beginner')
        .single();
        
      if (beginnerBadge) {
        await awardBadge(userId, beginnerBadge.id);
      }
    }
    
    if (completedProblems && completedProblems.length >= 25) {
      const { data: intermediateBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Python Intermediate')
        .single();
        
      if (intermediateBadge) {
        await awardBadge(userId, intermediateBadge.id);
      }
    }
    
    // Check for rank badges based on level
    if (profile.level >= 5) {
      const { data: rankBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Rising Star')
        .single();
        
      if (rankBadge) {
        await awardBadge(userId, rankBadge.id);
      }
    }
    
    // Check for challenge badges based on daily challenge streak
    if (profile.daily_challenge_streak >= 7) {
      const { data: streakBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Weekly Challenger')
        .single();
        
      if (streakBadge) {
        await awardBadge(userId, streakBadge.id);
      }
    }
  } catch (error) {
    console.error('Error checking and awarding badges:', error);
  }
};
