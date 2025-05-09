import { supabase } from '@/integrations/supabase/client';
import { 
  LearningPath, 
  PathNode, 
  UserPathProgress, 
  UserPathNodeProgress 
} from '@/types/user';

// Get all learning paths
export const getAllLearningPaths = async (): Promise<LearningPath[]> => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('is_active', true)
      .order('sequence_number', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return [];
  }
};

// Get learning path by ID
export const getLearningPath = async (pathId: string): Promise<LearningPath | null> => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', pathId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return null;
  }
};

// Get nodes for a learning path
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
    console.error('Error fetching path nodes:', error);
    return [];
  }
};

// Get user's progress for a learning path
export const getUserPathProgress = async (
  userId: string, 
  pathId: string
): Promise<UserPathProgress | null> => {
  try {
    const { data, error } = await supabase
      .from('user_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .single();
      
    if (error) {
      if (error.code !== 'PGRST116') { // No rows returned
        console.error('Error fetching user path progress:', error);
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user path progress:', error);
    return null;
  }
};

// Get user's progress for all learning paths
export const getUserAllPathsProgress = async (userId: string): Promise<UserPathProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('user_path_progress')
      .select('*, path:learning_paths(*)')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user path progress:', error);
    return [];
  }
};

// Get user's node completions for a path
export const getUserPathNodeCompletions = async (
  userId: string, 
  pathId: string
): Promise<UserPathNodeProgress[]> => {
  try {
    const { data: nodes } = await getPathNodes(pathId);
    if (!nodes || nodes.length === 0) return [];
    
    const nodeIds = nodes.map(node => node.id);
    
    const { data, error } = await supabase
      .from('user_path_node_progress')
      .select('*, node:path_nodes(*)')
      .eq('user_id', userId)
      .in('node_id', nodeIds);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user node completions:', error);
    return [];
  }
};

// Start or update user progress on a learning path
export const startOrUpdateLearningPath = async (
  userId: string,
  pathId: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Check if user already has progress record
    const { data: existingProgress } = await supabase
      .from('user_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .single();
      
    if (existingProgress) {
      // Update last accessed timestamp
      const { error } = await supabase
        .from('user_path_progress')
        .update({ 
          last_accessed: new Date().toISOString() 
        })
        .eq('id', existingProgress.id);
        
      if (error) throw error;
    } else {
      // Create new progress record
      const { error } = await supabase
        .from('user_path_progress')
        .insert({
          user_id: userId,
          path_id: pathId,
          nodes_completed: [],
          is_completed: false
        });
        
      if (error) throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error starting or updating learning path:', error);
    return { success: false, error };
  }
};

// Complete a path node
export const completePathNode = async (
  userId: string,
  nodeId: string,
  attempts: number = 1
): Promise<{ success: boolean; pathUpdated: boolean; error?: any }> => {
  try {
    // Get node details to find path ID
    const { data: node, error: nodeError } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('id', nodeId)
      .single();
      
    if (nodeError) throw nodeError;
    if (!node) throw new Error('Node not found');
    
    // Check if node already completed
    const { data: existingCompletion } = await supabase
      .from('user_path_node_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('node_id', nodeId)
      .single();
      
    if (existingCompletion) {
      return { success: true, pathUpdated: false }; // Already completed
    }
    
    // Create completion record
    const { error } = await supabase
      .from('user_path_node_progress')
      .insert({
        user_id: userId,
        node_id: nodeId,
        attempts: attempts
      });
      
    if (error) throw error;
    
    // Update user path progress
    const { data: userProgress } = await supabase
      .from('user_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', node.path_id)
      .single();
    
    let pathUpdated = false;
    
    if (userProgress) {
      const completedNodes = userProgress.nodes_completed || [];
      if (!completedNodes.includes(nodeId)) {
        completedNodes.push(nodeId);
        
        // Check if all nodes are completed
        const { data: allNodes } = await supabase
          .from('path_nodes')
          .select('id')
          .eq('path_id', node.path_id);
          
        const isCompleted = allNodes && 
          completedNodes.length === allNodes.length;
        
        // Update progress
        await supabase
          .from('user_path_progress')
          .update({ 
            nodes_completed: completedNodes,
            is_completed: isCompleted,
            last_accessed: new Date().toISOString()
          })
          .eq('id', userProgress.id);
          
        pathUpdated = true;
      }
    } else {
      // Create new progress record
      await supabase
        .from('user_path_progress')
        .insert({
          user_id: userId,
          path_id: node.path_id,
          nodes_completed: [nodeId],
          is_completed: false
        });
        
      pathUpdated = true;
    }
    
    return { success: true, pathUpdated };
  } catch (error) {
    console.error('Error completing path node:', error);
    return { success: false, pathUpdated: false, error };
  }
};

// Check if a node is accessible (prerequisites met)
export const isNodeAccessible = async (
  userId: string,
  nodeId: string
): Promise<boolean> => {
  try {
    // Get node details
    const { data: node, error: nodeError } = await supabase
      .from('path_nodes')
      .select('*')
      .eq('id', nodeId)
      .single();
      
    if (nodeError || !node) return false;
    
    // If no prerequisites, node is accessible
    if (!node.prerequisite_nodes || node.prerequisite_nodes.length === 0) {
      return true;
    }
    
    // Check if prerequisites are completed
    const { data: completions } = await supabase
      .from('user_path_node_progress')
      .select('node_id')
      .eq('user_id', userId)
      .in('node_id', node.prerequisite_nodes);
      
    // All prerequisites must be completed
    return completions && 
      completions.length === node.prerequisite_nodes.length;
  } catch (error) {
    console.error('Error checking node accessibility:', error);
    return false;
  }
};

// Calculate next recommended path for user
export const getNextRecommendedPath = async (userId: string): Promise<LearningPath | null> => {
  try {
    // Get all active paths
    const { data: allPaths } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('is_active', true)
      .order('sequence_number', { ascending: true });
      
    if (!allPaths || allPaths.length === 0) return null;
    
    // Get user's paths in progress
    const { data: userPaths } = await supabase
      .from('user_path_progress')
      .select('path_id, is_completed')
      .eq('user_id', userId);
      
    if (!userPaths || userPaths.length === 0) {
      // User hasn't started any paths, recommend first path
      return allPaths[0];
    }
    
    // Find paths not completed
    const completedPathIds = userPaths
      .filter(p => p.is_completed)
      .map(p => p.path_id);
      
    const inProgressPathIds = userPaths
      .filter(p => !p.is_completed)
      .map(p => p.path_id);
      
    // If there's a path in progress, recommend continuing it
    if (inProgressPathIds.length > 0) {
      const inProgressPath = allPaths.find(p => p.id === inProgressPathIds[0]);
      if (inProgressPath) return inProgressPath;
    }
    
    // Otherwise recommend a path not yet started or completed
    const uncompletedPaths = allPaths.filter(
      p => !completedPathIds.includes(p.id) && !inProgressPathIds.includes(p.id)
    );
    
    if (uncompletedPaths.length > 0) {
      return uncompletedPaths[0];
    }
    
    // All paths completed, recommend based on sequence
    return allPaths[0];
  } catch (error) {
    console.error('Error getting next recommended path:', error);
    return null;
  }
};
