
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Circle, 
  Lock, 
  Play 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  getLearningPath,
  getPathNodes,
  getUserPathProgress,
  getUserPathNodeCompletions, 
  startOrUpdateLearningPath,
  isNodeAccessible
} from '@/services/learningPathService';
import { 
  LearningPath, 
  PathNode, 
  UserPathNodeProgress
} from '@/types/user';

const LearningPathPage = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [path, setPath] = useState<LearningPath | null>(null);
  const [nodes, setNodes] = useState<PathNode[]>([]);
  const [nodeCompletions, setNodeCompletions] = useState<UserPathNodeProgress[]>([]);
  const [accessibleNodes, setAccessibleNodes] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (pathId) {
      loadPathDetails();
    }
  }, [pathId, user]);
  
  const loadPathDetails = async () => {
    if (!pathId) return;
    
    setIsLoading(true);
    try {
      // Get path details
      const pathDetails = await getLearningPath(pathId);
      if (!pathDetails) {
        navigate('/learning-paths');
        return;
      }
      setPath(pathDetails);
      
      // Get path nodes
      const pathNodes = await getPathNodes(pathId);
      setNodes(pathNodes);
      
      if (user?.id) {
        // Start or update user progress
        await startOrUpdateLearningPath(user.id, pathId);
        
        // Get user's node completions
        const completions = await getUserPathNodeCompletions(user.id, pathId);
        setNodeCompletions(completions);
        
        // Check accessibility for each node
        const accessibility: Record<string, boolean> = {};
        for (const node of pathNodes) {
          accessibility[node.id] = await isNodeAccessible(user.id, node.id);
        }
        setAccessibleNodes(accessibility);
      }
    } catch (error) {
      console.error('Error loading path details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isNodeCompleted = (nodeId: string): boolean => {
    return nodeCompletions.some(completion => completion.node_id === nodeId);
  };
  
  const handleStartNode = (node: PathNode) => {
    if (!user?.id) {
      navigate('/auth');
      return;
    }
    
    // Based on node type, navigate to appropriate page
    if (node.node_type === 'Problem' && node.content_id) {
      navigate(`/problem/${node.content_id}`);
    } else if (node.node_type === 'Quiz' && node.content_id) {
      navigate(`/quiz/${node.content_id}`);
    } else {
      // For other node types, we would need additional logic
      console.log(`Starting ${node.node_type}: ${node.title}`);
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!path) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>
          <p className="mb-6">The learning path you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/learning-paths')}>
            Return to Learning Paths
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate('/learning-paths')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Paths
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{path.title}</h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                {path.description}
              </p>
            </div>
            <Badge variant="outline" className="capitalize">
              {path.difficulty}
            </Badge>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Path Progress</CardTitle>
            <CardDescription>
              Your journey through this learning path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {nodes.map((node, index) => {
                const isCompleted = isNodeCompleted(node.id);
                const isAccessible = accessibleNodes[node.id] ?? false;
                
                return (
                  <div key={node.id} className="relative">
                    {/* Vertical line connecting nodes */}
                    {index < nodes.length - 1 && (
                      <div className={`absolute left-3 top-6 w-0.5 h-8 bg-${isAccessible && isCompleted ? 'primary' : 'gray-200'}`}></div>
                    )}
                    
                    <div className="flex items-start">
                      {/* Node status icon */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full ${
                        isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : isAccessible 
            '                ? 'bg-primary/20 text-primary' 
                            : 'bg-gray-200 text-gray-500'
                      } flex items-center justify-center mr-4`}>
                        {isCompleted 
                          ? <Check className="h-4 w-4" /> 
                          : isAccessible 
                            ? <Circle className="h-4 w-4" /> 
                            : <Lock className="h-3 w-3" />}
                      </div>
                      
                      {/* Node content */}
                      <div className={`flex-grow p-4 rounded-lg border ${
                        isCompleted 
                          ? 'bg-primary/5 border-primary/20' 
                          : isAccessible 
                            ? 'bg-background border-gray-200' 
                            : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${!isAccessible ? 'text-gray-500' : ''}`}>
                              {node.title}
                            </h3>
                            <Badge variant="outline" className="mt-1 capitalize">
                              {node.node_type}
                            </Badge>
                            {node.description && (
                              <p className={`text-sm mt-2 ${!isAccessible ? 'text-gray-500' : 'text-muted-foreground'}`}>
                                {node.description}
                              </p>
                            )}
                          </div>
                          
                          {/* XP reward */}
                          <div className="flex items-center text-sm">
                            <span className={`font-medium ${!isAccessible ? 'text-gray-500' : 'text-primary'}`}>
                              {node.xp_reward} XP
                            </span>
                          </div>
                        </div>
                        
                        {/* Start button */}
                        {isAccessible && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={() => handleStartNode(node)}
                            >
                              {isCompleted ? 'Review' : 'Start'}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {nodes.length === 0 && (
                <div className="text-center py-8">
                  <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p>No content available in this learning path yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check back soon for new content!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LearningPathPage;
