
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { LearningPath, UserPathProgress } from '@/types/user';
import { useNavigate } from 'react-router-dom';

interface LearningPathCardProps {
  path: LearningPath;
  progress?: UserPathProgress;
  isLocked?: boolean;
  onStartPath?: (pathId: string) => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  progress,
  isLocked = false,
  onStartPath
}) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };
  
  const handleClick = () => {
    if (isLocked) return;
    
    if (onStartPath) {
      onStartPath(path.id);
    }
    
    navigate(`/learning-path/${path.id}`);
  };
  
  // Calculate completion percentage
  const completedNodes = progress?.nodes_completed?.length || 0;
  const totalNodes = 10; // This would come from an API request in a real app
  const completionPercentage = Math.round((completedNodes / totalNodes) * 100);
  
  const getStatusBadge = () => {
    if (isLocked) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          <Lock className="h-3 w-3 mr-1" />
          Locked
        </Badge>
      );
    }
    
    if (progress?.is_completed) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }
    
    if (progress) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800">
          In Progress
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-800">
        Not Started
      </Badge>
    );
  };
  
  return (
    <Card className={`w-full transition-opacity ${isLocked ? 'opacity-70' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{path.title}</CardTitle>
            <CardDescription className="mt-1">
              {path.description.length > 100 
                ? `${path.description.substring(0, 100)}...` 
                : path.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="outline" className={getDifficultyColor(path.difficulty)}>
              {path.difficulty}
            </Badge>
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center mb-2">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          <span className="text-sm font-medium">{path.category}</span>
        </div>
        
        {(progress && !isLocked) && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {completedNodes} of {totalNodes} items completed
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleClick} 
          disabled={isLocked}
          variant={isLocked ? "outline" : "default"}
          className="w-full"
        >
          {progress?.is_completed 
            ? 'Review Path' 
            : progress 
              ? 'Continue Learning' 
              : 'Start Learning'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningPathCard;
