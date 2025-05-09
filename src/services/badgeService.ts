
import { supabase } from '@/integrations/supabase/client';
import { UserBadge } from '@/types/user';

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badge_id(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data as UserBadge[];
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
}

export async function toggleBadgeShowcase(badgeId: string, showcased: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_badges')
      .update({ showcased })
      .eq('id', badgeId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error toggling badge showcase:', error);
    return false;
  }
}
