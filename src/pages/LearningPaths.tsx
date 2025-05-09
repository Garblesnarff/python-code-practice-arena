
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LearningPathCard from '@/components/learning-path/LearningPathCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getAllLearningPaths, 
  getUserAllPathsProgress,
  startOrUpdateLearningPath,
  getNextRecommendedPath
} from '@/services/learningPathService';
import { LearningPath, UserPathProgress } from '@/types/user';
import { Lightbulb, GraduationCap } from 'lucide-react';

const LearningPaths = () => {
  const { user, profile } = useAuth();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [userProgress, setUserProgress] = useState<UserPathProgress[]>([]);
  const [recommendedPath, setRecommendedPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load all learning paths
      const allPaths = await getAllLearningPaths();
      setPaths(allPaths);
      
      if (user?.id) {
        // Load user progress for all paths
        const progress = await getUserAllPathsProgress(user.id);
        setUserProgress(progress);
        
        // Get recommended next path
        const nextPath = await getNextRecommendedPath(user.id);
        setRecommendedPath(nextPath);
      }
    } catch (error) {
      console.error('Error loading learning paths:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPath = async (pathId: string) => {
    if (user?.id) {
      await startOrUpdateLearningPath(user.id, pathId);
      loadData(); // Refresh data
    }
  };

  // Check if a path is locked (prerequisites not met)
  const isPathLocked = (path: LearningPath): boolean => {
    if (!path.prerequisite_paths || path.prerequisite_paths.length === 0) {
      return false; // No prerequisites
    }
    
    // Check if all prerequisites are completed
    const completedPathIds = userProgress
      .filter(p => p.is_completed)
      .map(p => p.path_id);
      
    return !path.prerequisite_paths.every(id => completedPathIds.includes(id));
  };

  // Get user progress for a specific path
  const getPathProgress = (pathId: string): UserPathProgress | undefined => {
    return userProgress.find(p => p.path_id === pathId);
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Learning Paths</h1>
            <p className="text-muted-foreground mt-1">
              Structured learning experiences to master Python programming
            </p>
          </div>
        </div>

        {recommendedPath && (
          <div className="mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Recommended Path</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <LearningPathCard
                      path={recommendedPath}
                      progress={getPathProgress(recommendedPath.id)}
                      isLocked={isPathLocked(recommendedPath)}
                      onStartPath={handleStartPath}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1 lg:col-span-2 flex items-center">
                    <div className="bg-background p-4 rounded-lg w-full">
                      <h3 className="font-medium text-lg mb-2">Why This Path?</h3>
                      <p className="text-muted-foreground">
                        This learning path is recommended based on your current progress and skill level.
                        It's designed to help you build on your existing knowledge and develop new skills.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">All Learning Paths</h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="w-full h-64 animate-pulse">
                  <div className="h-full bg-gray-200 dark:bg-gray-800"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paths.map(path => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  progress={getPathProgress(path.id)}
                  isLocked={isPathLocked(path)}
                  onStartPath={handleStartPath}
                />
              ))}
              
              {paths.length === 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p>No learning paths available yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check back soon for new learning content!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LearningPaths;
