
import { supabase } from '@/integrations/supabase/client';
import { PathNode, UserPathNodeProgress, NodeType } from '@/types/user';

/**
 * Fetches all learning paths
 */
export const getLearningPaths = async () => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('sequence_number');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return [];
  }
};

/**
 * Fetches a learning path by ID
 */
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

/**
 * Fetches all nodes for a learning path
 */
export const getPathNodes = async (pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('path_id', pathId)
      .order('sequence_number');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching nodes for path ${pathId}:`, error);
    return [];
  }
};

/**
 * Fetches a specific node
 */
export const getPathNodeById = async (nodeId: string): Promise<PathNode | null> => {
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

/**
 * Fetches user progress for a path
 */
export const getUserPathProgress = async (userId: string, pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        // Create progress record if one doesn't exist
        return createUserPathProgress(userId, pathId);
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching user progress for path ${pathId}:`, error);
    return null;
  }
};

/**
 * Creates a new user progress record for a path
 */
const createUserPathProgress = async (userId: string, pathId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_path_progress')
      .insert({
        user_id: userId,
        path_id: pathId,
        nodes_completed: [],
        is_completed: false,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error creating user progress for path ${pathId}:`, error);
    return null;
  }
};

/**
 * Fetches all node progress for a user
 */
export const getUserNodeProgress = async (userId: string): Promise<UserPathNodeProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('user_path_node_progress')
      .select('*, node:path_nodes(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching node progress for user ${userId}:`, error);
    return [];
  }
};

/**
 * Completes a path node for a user
 */
export const completePathNode = async (userId: string, nodeId: string, attempts = 1) => {
  try {
    // Check if already completed
    const { data: existing, error: checkError } = await supabase
      .from('user_path_node_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('node_id', nodeId);
    
    if (checkError) throw checkError;
    
    if (existing && existing.length > 0) {
      // Already completed, update attempts if higher
      if (existing[0].attempts < attempts) {
        const { error: updateError } = await supabase
          .from('user_path_node_progress')
          .update({ attempts })
          .eq('id', existing[0].id);
        
        if (updateError) throw updateError;
      }
      return true;
    }
    
    // Complete the node
    const { error } = await supabase
      .from('user_path_node_progress')
      .insert({
        user_id: userId,
        node_id: nodeId,
        attempts
      });
    
    if (error) throw error;
    
    // Update the path progress
    await updatePathProgress(userId, nodeId);
    
    return true;
  } catch (error) {
    console.error(`Error completing node ${nodeId} for user ${userId}:`, error);
    return false;
  }
};

/**
 * Updates path progress when a node is completed
 */
const updatePathProgress = async (userId: string, nodeId: string) => {
  try {
    // Get the node to find the path ID
    const node = await getPathNodeById(nodeId);
    if (!node) return false;
    
    // Get user path progress
    const pathProgress = await getUserPathProgress(userId, node.path_id);
    if (!pathProgress) return false;
    
    // Add node to completed nodes if not already present
    if (!pathProgress.nodes_completed.includes(nodeId)) {
      const updatedNodes = [...pathProgress.nodes_completed, nodeId];
      
      // Get all nodes to check if path is now complete
      const allNodes = await getPathNodes(node.path_id);
      const isComplete = allNodes.length > 0 && updatedNodes.length >= allNodes.length;
      
      // Update progress
      const { error } = await supabase
        .from('user_path_progress')
        .update({
          nodes_completed: updatedNodes,
          is_completed: isComplete,
          last_accessed: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', pathProgress.id);
      
      if (error) throw error;
      
      // If path is now complete, update user profile
      if (isComplete) {
        await updateUserPathCompletion(userId);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating path progress for node ${nodeId}, user ${userId}:`, error);
    return false;
  }
};

/**
 * Updates user profile when a path is completed
 */
const updateUserPathCompletion = async (userId: string) => {
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('total_paths_completed')
      .eq('id', userId)
      .single();
    
    if (profileError) throw profileError;
    
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        total_paths_completed: (userProfile.total_paths_completed || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error(`Error updating user ${userId} path completion:`, error);
    return false;
  }
};

/**
 * Recommends the next node for a user based on their progress
 */
export const getNextRecommendedNode = async (userId: string, pathId: string): Promise<PathNode | null> => {
  try {
    // Get user's progress
    const progress = await getUserPathProgress(userId, pathId);
    if (!progress) return null;
    
    // Get all nodes for this path
    const nodes = await getPathNodes(pathId);
    if (nodes.length === 0) return null;
    
    // Find incomplete nodes
    const incompleteNodes = nodes.filter(
      node => !progress.nodes_completed.includes(node.id)
    );
    
    if (incompleteNodes.length === 0) return null;
    
    // Return the first incomplete node that has all prerequisites completed
    for (const node of incompleteNodes) {
      const prerequisites = node.prerequisite_nodes || [];
      const allPrerequisitesMet = prerequisites.every(
        prereq => progress.nodes_completed.includes(prereq)
      );
      
      if (allPrerequisitesMet) {
        return node;
      }
    }
    
    // If no suitable node found, return the first incomplete node
    return incompleteNodes[0];
  } catch (error) {
    console.error(`Error finding next recommended node for user ${userId}, path ${pathId}:`, error);
    return null;
  }
};
