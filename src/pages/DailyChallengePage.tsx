
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getTodaysChallenge, completeDailyChallenge } from '@/services/dailyChallengeService';
import { DailyChallenge } from '@/types/user';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import { getProblemById } from '@/utils/problemHelpers';
import { Problem } from '@/data/problems/types';

const DailyChallengePage = () => {
  const { problemId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState<number>(Date.now());
  
  useEffect(() => {
    loadChallenge();
  }, [problemId, user]);
  
  const loadChallenge = async () => {
    setIsLoading(true);
    try {
      // Get today's challenge
      const todaysChallenge = await getTodaysChallenge();
      setChallenge(todaysChallenge);
      
      // Verify that the problemId matches today's challenge
      if (todaysChallenge && problemId && todaysChallenge.problem_id !== problemId) {
        navigate('/daily-challenges');
        return;
      }
      
      // Get problem details
      if (problemId) {
        const problemData = getProblemById(problemId);
        if (problemData) {
          setProblem(problemData);
        } else {
          navigate('/daily-challenges');
        }
      }
    } catch (error) {
      console.error('Error loading daily challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChallengeComplete = async () => {
    if (!user?.id || !challenge) return;
    
    // Calculate time taken
    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    // Mark challenge as completed
    await completeDailyChallenge(user.id, challenge.id, timeTakenSeconds);
  };
  
  // Get extra props from problem execution hook
  const problemExecutionProps = problem ? useProblemExecution({
    problem,
    difficulty: challenge?.difficulty || 'easy',
  }) : null;
  
  // Handle successful test completion
  useEffect(() => {
    if (problemExecutionProps && 
        problemExecutionProps.testResults && 
        problemExecutionProps.testResults.summary.passed === problemExecutionProps.testResults.summary.total) {
      handleChallengeComplete();
    }
  }, [problemExecutionProps?.testResults]);
  
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
  
  if (!problem || !challenge) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <p className="mb-6">The daily challenge you're looking for doesn't exist or has expired.</p>
          <Button onClick={() => navigate('/daily-challenges')}>
            Return to Challenges
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daily Challenge</h1>
            <p className="text-muted-foreground">
              {new Date(challenge.challenge_date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div>
            <Button 
              variant="outline"
              onClick={() => navigate('/daily-challenges')}
            >
              Back to Challenges
            </Button>
          </div>
        </div>
        
        <Card className="mb-4 p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium mr-2">Bonus XP:</span>
              <span>{challenge.bonus_xp} XP</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Difficulty:</span>
              <span className="capitalize">{challenge.difficulty}</span>
            </div>
          </div>
        </Card>
        
        {problemExecutionProps && (
          <ProblemContainer
            problem={problem}
            {...problemExecutionProps}
          />
        )}
      </div>
    </Layout>
  );
};

export default DailyChallengePage;
