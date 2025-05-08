
import React, { useState, useEffect } from 'react';
import { hardProblems } from '@/data/problems/hard-problems';
import { useToast } from '@/components/ui/use-toast';
import LoadingOverlay from '@/components/LoadingOverlay';
import Header from '@/components/problem-page/Header';
import Footer from '@/components/problem-page/Footer';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import ProblemNavigation from '@/components/ProblemNavigation';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import { useAuth } from '@/contexts/AuthContext';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';
import { useNavigate } from 'react-router-dom';
import { usePyodide } from '@/hooks/usePyodide';
import { useNotifications } from '@/hooks/useNotifications';
import { useCompletedProblems } from '@/hooks/useCompletedProblems';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { completeProblem } from '@/services/gamificationService';
import { useProfileData } from '@/hooks/useProfileData';
import ProfileStatusBar from '@/components/problem-page/ProfileStatusBar';
import NavigationBar from '@/components/layout/NavigationBar';

const HardProblems = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { refreshAllProfileData } = useProfileData();
  const { isPyodideLoading } = usePyodide();
  
  const {
    xpNotification,
    levelUpNotification,
    showXPNotification,
    handleNotificationClose,
    handleLevelUpNotificationClose
  } = useNotifications();
  
  const {
    completedProblems,
    refreshCompletedProblems,
    isProblemCompleted
  } = useCompletedProblems();
  
  const currentProblem = hardProblems[currentProblemIndex];
  
  const {
    code,
    testResults,
    isExecuting,
    handleCodeChange,
    executeCode,
    handleClearCode
  } = useCodeExecution(currentProblem);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !isPyodideLoading) {
      navigate('/auth');
    }
  }, [user, isPyodideLoading, navigate]);

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
          'hard'
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

  if (isPyodideLoading) {
    return <LoadingOverlay />;
  }

  const completedProblemIds = completedProblems.map(p => p.problem_id);
  const completedCount = completedProblems.filter(p => p.difficulty === 'hard').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      <Header title="Hard Python Problems" />

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Hard Problems', href: '/hard' },
              { label: `Problem ${currentProblemIndex + 1}`, href: '#' }
            ]}
          />
          
          {user && profile && (
            <ProfileStatusBar 
              profile={profile}
              completedCount={completedCount}
              totalProblems={hardProblems.length}
            />
          )}
          
          <ProblemNavigation
            problems={hardProblems}
            currentProblemIndex={currentProblemIndex}
            onSelectProblem={handleSelectProblem}
            completedProblems={completedProblemIds}
          />
          
          <ProblemContainer 
            problem={currentProblem}
            code={code}
            testResults={testResults}
            isExecuting={isExecuting}
            onCodeChange={handleCodeChange}
            onRunTests={handleRunTests}
            onClearCode={handleClearCode}
            isCompleted={isProblemCompleted(currentProblem.id)}
          />
        </div>
      </main>
      
      <Footer />

      <XPNotificationManager
        notification={xpNotification}
        levelUpNotification={levelUpNotification}
        onNotificationClose={handleNotificationClose}
        onLevelUpNotificationClose={handleLevelUpNotificationClose}
      />
    </div>
  );
};

export default HardProblems;
