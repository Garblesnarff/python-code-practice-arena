
import { supabase } from '@/integrations/supabase/client';

// Get user path progress
export const getUserPathProgress = async (userId: string, pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .single();
      
    if (error) {
      // If no record found, create one
      if (error.code === 'PGRST116') { // No rows returned
        return createUserPathProgress(userId, pathId);
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching user path progress for user ${userId}, path ${pathId}:`, error);
    return null;
  }
};

// Create user path progress
export const createUserPathProgress = async (userId: string, pathId: string) => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('user_path_progress')
      .insert({
        user_id: userId,
        path_id: pathId,
        nodes_completed: [],
        is_completed: false,
        last_accessed: now,
        created_at: now,
        updated_at: now
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error creating user path progress for user ${userId}, path ${pathId}:`, error);
    return null;
  }
};
