
import { supabase } from '@/integrations/supabase/client';
import { getUserPathProgress } from './user-progress-service';
import { PathNode, UserPathNodeProgress, NodeType } from '@/types/user';

// Get all learning paths
export const getLearningPaths = async () => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('sequence_number', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return [];
  }
};

// Get a specific learning path by ID
export const getLearningPathById = async (pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', pathId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching learning path ${pathId}:`, error);
    return null;
  }
};

// Get nodes for a specific learning path
export const getPathNodes = async (pathId: string): Promise<PathNode[]> => {
  try {
    const { data, error } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('path_id', pathId)
      .order('sequence_number', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching nodes for path ${pathId}:`, error);
    return [];
  }
};

// Get a specific node by ID
export const getNodeById = async (nodeId: string): Promise<PathNode | null> => {
  try {
    const { data, error } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('id', nodeId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching node ${nodeId}:`, error);
    return null;
  }
};

// Mark a node as completed
export const completePathNode = async (
  userId: string,
  nodeId: string
): Promise<UserPathNodeProgress | null> => {
  try {
    // Check if already completed
    const { data: existingProgress } = await supabase
      .from('user_path_node_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('node_id', nodeId)
      .single();
    
    if (existingProgress) {
      // Update attempt count
      const { data, error } = await supabase
        .from('user_path_node_progress')
        .update({
          attempts: existingProgress.attempts + 1
        })
        .eq('id', existingProgress.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } else {
      // Create new progress entry
      const { data, error } = await supabase
        .from('user_path_node_progress')
        .insert({
          user_id: userId,
          node_id: nodeId,
          attempts: 1
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update user path progress
      await updateUserPathProgress(userId, nodeId);
      
      return data;
    }
  } catch (error) {
    console.error(`Error completing node ${nodeId} for user ${userId}:`, error);
    return null;
  }
};

// Helper to update user's path progress
const updateUserPathProgress = async (userId: string, nodeId: string): Promise<void> => {
  try {
    // Get node details to find path
    const node = await getNodeById(nodeId);
    if (!node) return;
    
    // Get current path progress
    const pathProgress = await getUserPathProgress(userId, node.path_id);
    if (!pathProgress) return;
    
    // Add the node to completed nodes if not already included
    if (!pathProgress.nodes_completed.includes(nodeId)) {
      const updatedNodes = [...pathProgress.nodes_completed, nodeId];
      
      // Check if all nodes are completed
      const allNodes = await getPathNodes(node.path_id);
      const isCompleted = allNodes.length > 0 && 
        allNodes.every(pathNode => updatedNodes.includes(pathNode.id));
      
      // Update path progress
      await supabase
        .from('user_path_progress')
        .update({
          nodes_completed: updatedNodes,
          is_completed: isCompleted,
          updated_at: new Date().toISOString()
        })
        .eq('id', pathProgress.id);
        
      // If completed, increment total paths completed in user profile
      if (isCompleted) {
        await supabase
          .from('user_profiles')
          .update({
            total_paths_completed: supabase.rpc('increment', { x: 1 })
          })
          .eq('id', userId);
      }
    }
  } catch (error) {
    console.error(`Error updating path progress for user ${userId}, node ${nodeId}:`, error);
  }
};

// Get all completed nodes for a user
export const getCompletedNodes = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_path_node_progress')
      .select('node_id')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data.map(progress => progress.node_id);
  } catch (error) {
    console.error(`Error fetching completed nodes for user ${userId}:`, error);
    return [];
  }
};

// Get node progress details
export const getNodeProgress = async (
  userId: string,
  nodeId: string
): Promise<UserPathNodeProgress | null> => {
  try {
    const { data, error } = await supabase
      .from('user_path_node_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('node_id', nodeId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data || null;
  } catch (error) {
    console.error(`Error fetching node progress for user ${userId}, node ${nodeId}:`, error);
    return null;
  }
};
