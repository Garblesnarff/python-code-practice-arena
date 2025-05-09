
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export type Badge = {
  id: string;
  name: string;
  description: string;
  category: "Skill" | "Rank" | "Challenge";
  subcategory: string;
  icon: string;
  requirements: Json;
  is_seasonal: boolean;
  created_at: string;
  updated_at: string;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  showcased: boolean;
  badge: Badge;
};

export async function getAllBadges(): Promise<Badge[]> {
  try {
    const { data, error } = await supabase.from('badges').select('*');
    
    if (error) {
      throw error;
    }
    
    // Type assertion to ensure data conforms to Badge[]
    return data as Badge[];
  } catch (error) {
    console.error('Error fetching badges:', error);
    return [];
  }
}

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    // Type assertion to ensure data conforms to UserBadge[]
    return data as UserBadge[];
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
}

export async function getUserShowcasedBadges(userId: string): Promise<UserBadge[]> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId)
      .eq('showcased', true);
    
    if (error) {
      throw error;
    }
    
    // Type assertion to ensure data conforms to UserBadge[]
    return data as UserBadge[];
  } catch (error) {
    console.error('Error fetching showcased badges:', error);
    return [];
  }
}

export async function toggleShowcaseBadge(userBadgeId: string, showcased: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_badges')
      .update({ showcased })
      .eq('id', userBadgeId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error toggling badge showcase:', error);
    return false;
  }
}
