
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
import { completeProblem } from '@/services/gamificationService';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';
import { usePyodide } from '@/hooks/usePyodide';
import { useNotifications } from '@/hooks/useNotifications';
import { useCompletedProblems } from '@/hooks/useCompletedProblems';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { useProfileData } from '@/hooks/useProfileData';
import NavigationBar from '@/components/layout/NavigationBar';

const Fundamentals = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { refreshAllProfileData } = useProfileData();
  const { isPyodideLoading } = usePyodide();
  
  const {
    xpNotification,
    showXPNotification,
    handleNotificationClose
  } = useNotifications();
  
  const {
    completedProblems,
    refreshCompletedProblems,
    isProblemCompleted
  } = useCompletedProblems();
  
  const currentProblem = fundamentalProblems[currentProblemIndex];
  
  const {
    code,
    testResults,
    isExecuting,
    handleCodeChange,
    executeCode,
    handleClearCode
  } = useCodeExecution(currentProblem);
  
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
  
  const handleRunTests = async () => {
    const results = await executeCode(currentProblem.test_cases);
    
    if (!results) return;
    
    // Check if all tests passed and award XP
    if (results.summary.passed === results.summary.total && user) {
      // Check if problem already completed
      const isAlreadyCompleted = isProblemCompleted(currentProblem.id);
      
      if (!isAlreadyCompleted) {
        const prevLevel = profile?.level || 1;
        const { success, xpGained } = await completeProblem(
          user.id,
          currentProblem.id,
          'fundamentals'
        );
        
        if (success && xpGained > 0) {
          // Refresh profile data to update XP and level
          const updatedProfile = await refreshAllProfileData();
          
          // Show XP notification
          showXPNotification(`+${xpGained} XP gained!`);
          
          // Refresh completed problems
          await refreshCompletedProblems();
          
          // Check for level up
          if (updatedProfile && updatedProfile.level > prevLevel) {
            setTimeout(() => {
              showXPNotification(`Level up! You're now level ${updatedProfile.level}!`, 'level');
            }, 4000); // Show after the XP notification disappears
          }
        }
      }
      
      toast({
        title: 'Success!',
        description: `All ${results.summary.total} tests passed! 🎉`,
        variant: 'default'
      });
    } else {
      toast({
        title: 'Tests Completed',
        description: `Passed ${results.summary.passed} of ${results.summary.total} tests.`,
        variant: 'default'
      });
    }
  };

  if (isPyodideLoading || authLoading) {
    return <LoadingOverlay />;
  }
  
  // Extract completed problem IDs for navigation
  const completedProblemIds = completedProblems.map(problem => problem.problem_id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      
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
    </div>
  );
};

export default Fundamentals;
