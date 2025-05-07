
import React, { useState, useEffect } from 'react';
import { fundamentalProblems } from '@/data/fundamentals';
import { useToast } from '@/components/ui/use-toast';
import LoadingOverlay from '@/components/LoadingOverlay';
import ProblemNavigation from '@/components/ProblemNavigation';
import TestResults from '@/components/TestResults';
import FundamentalsLayout from '@/components/fundamentals/FundamentalsLayout';
import ProblemSection from '@/components/fundamentals/ProblemSection';
import CodeEditorSection from '@/components/fundamentals/CodeEditorSection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCompletedProblems } from '@/services/gamificationService';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';
import { useProblemExecution } from '@/hooks/useProblemExecution';

const Fundamentals = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  
  const currentProblem = fundamentalProblems[currentProblemIndex];
  
  // Use our custom hook for problem execution
  const {
    code,
    testResults,
    isPyodideLoading,
    isExecuting,
    xpNotification,
    completedProblems,
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose
  } = useProblemExecution({ problem: currentProblem, difficulty: 'fundamentals' });
  
  // Check if user is authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to track your progress and earn XP.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  const handleSelectProblem = (index: number) => {
    setCurrentProblemIndex(index);
  };

  if (isPyodideLoading || authLoading) {
    return <LoadingOverlay />;
  }
  
  // Extract completed problem IDs for navigation
  const completedProblemIds = completedProblems.map(problem => problem.problem_id);

  return (
    <FundamentalsLayout currentProblemIndex={currentProblemIndex}>
      <ProblemNavigation
        problems={fundamentalProblems}
        currentProblemIndex={currentProblemIndex}
        onSelectProblem={handleSelectProblem}
        completedProblems={completedProblemIds}
      />
      
      {/* XP Notification */}
      <XPNotificationManager 
        notification={xpNotification}
        onNotificationClose={handleNotificationClose}
      />
      
      <div className="mt-4 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-14rem)]">
        <ProblemSection 
          problem={currentProblem} 
          className="lg:col-span-2" 
        />
        
        <div className="flex flex-col gap-6 lg:col-span-3">
          <CodeEditorSection 
            code={code}
            onChange={handleCodeChange}
            onRun={handleRunTests}
            onClear={handleClearCode}
            isExecuting={isExecuting}
          />
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col h-1/2">
            <h2 className="text-lg font-semibold p-4 border-b">Results</h2>
            <div className="flex-1 overflow-hidden">
              <TestResults results={testResults} />
            </div>
          </div>
        </div>
      </div>
    </FundamentalsLayout>
  );
};

export default Fundamentals;
