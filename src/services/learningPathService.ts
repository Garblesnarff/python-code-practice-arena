
import { supabase } from '@/integrations/supabase/client';
import { PathNode, UserPathNodeProgress, NodeType } from '@/types/user';

// Fetch a learning path by ID
export const getLearningPathById = async (pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', pathId)
      .single();

    if (error) {
      console.error('Error fetching learning path:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching learning path:', error);
    return null;
  }
};

// Fetch all learning paths
export const getAllLearningPaths = async () => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('sequence_number', { ascending: true });

    if (error) {
      console.error('Error fetching learning paths:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exception fetching learning paths:', error);
    return [];
  }
};

// Fetch nodes for a specific learning path
export const getNodesForPath = async (pathId: string): Promise<PathNode[]> => {
  try {
    const { data, error } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('path_id', pathId)
      .order('sequence_number', { ascending: true });

    if (error) {
      console.error('Error fetching path nodes:', error);
      return [];
    }

    // Ensure the node_type property adheres to the NodeType type
    return (data || []).map(node => ({
      ...node,
      node_type: node.node_type as NodeType
    }));
  } catch (error) {
    console.error('Exception fetching path nodes:', error);
    return [];
  }
};

// Track progress for a path node
export const trackNodeCompletion = async (
  userId: string, 
  nodeId: string
): Promise<boolean> => {
  try {
    // Check if the node is already completed
    const { data: existingProgress, error: fetchError } = await supabase
      .from('user_path_node_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('node_id', nodeId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Not found is ok
      console.error('Error checking node completion:', fetchError);
      return false;
    }

    if (existingProgress) {
      // Update attempts count
      const { error: updateError } = await supabase
        .from('user_path_node_progress')
        .update({ 
          attempts: existingProgress.attempts + 1,
          completed_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id);

      if (updateError) {
        console.error('Error updating node progress:', updateError);
        return false;
      }
    } else {
      // Create new progress entry
      const { error: insertError } = await supabase
        .from('user_path_node_progress')
        .insert({
          user_id: userId,
          node_id: nodeId,
          completed_at: new Date().toISOString(),
          attempts: 1
        });

      if (insertError) {
        console.error('Error inserting node progress:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Exception tracking node completion:', error);
    return false;
  }
};

// Get user progress for nodes in a path
export const getUserNodeProgressForPath = async (
  userId: string, 
  pathId: string
): Promise<UserPathNodeProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('user_path_node_progress')
      .select(`
        *,
        node:path_nodes(*)
      `)
      .eq('user_id', userId)
      .eq('node.path_id', pathId);

    if (error) {
      console.error('Error fetching user node progress:', error);
      return [];
    }

    // Ensure the node_type property in each node adheres to the NodeType type
    return (data || []).map(progress => ({
      ...progress,
      node: progress.node ? {
        ...progress.node,
        node_type: progress.node.node_type as NodeType
      } : undefined
    }));
  } catch (error) {
    console.error('Exception fetching user node progress:', error);
    return [];
  }
};
