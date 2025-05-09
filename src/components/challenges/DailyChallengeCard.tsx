
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Zap, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { DailyChallenge } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface DailyChallengeCardProps {
  challenge: DailyChallenge | null;
  isCompleted: boolean;
  streak: number;
  onStartChallenge?: () => void;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  isCompleted,
  streak,
  onStartChallenge
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fundamentals':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };
  
  const handleStart = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to start daily challenges",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    setIsLoading(true);
    if (challenge) {
      navigate(`/challenge/${challenge.problem_id}`);
    }
    if (onStartChallenge) {
      onStartChallenge();
    }
    setIsLoading(false);
  };
  
  if (!challenge) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Challenge</CardTitle>
          <CardDescription>
            No challenge available today. Check back tomorrow!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            We're preparing a new challenge for you.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Daily Challenge</CardTitle>
            <CardDescription>
              {new Date(challenge.challenge_date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            <div className="flex items-center mt-2 text-xs">
              <Zap className="h-3 w-3 mr-1 text-amber-500" />
              <span>{challenge.bonus_xp} bonus XP</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Challenge Status</span>
            </div>
            <div className="flex items-center">
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">Completed</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="text-amber-500 font-medium">Not Completed</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Current Streak</span>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-md text-primary font-medium">
              {streak} day{streak !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleStart} 
          disabled={isCompleted || isLoading}
          className="w-full"
        >
          {isCompleted ? 'Challenge Completed' : 'Start Today\'s Challenge'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyChallengeCard;
