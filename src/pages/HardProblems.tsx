
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
import { useProblemExecution } from '@/hooks/useProblemExecution';
import ProfileStatusBar from '@/components/problem-page/ProfileStatusBar';
import NavigationBar from '@/components/layout/NavigationBar';

const HardProblems = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [levelUpNotification, setLevelUpNotification] = useState({
    visible: false,
    message: ''
  });
  
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const currentProblem = hardProblems[currentProblemIndex];

  // Use our custom hook for problem execution
  const {
    code,
    testResults,
    isPyodideLoading,
    isExecuting,
    xpNotification,
    completedProblems,
    isProblemCompleted,
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose
  } = useProblemExecution({ problem: currentProblem, difficulty: 'hard' });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !isPyodideLoading) {
      navigate('/auth');
    }
  }, [user, isPyodideLoading, navigate]);

  // Watch for level changes
  useEffect(() => {
    if (profile && profile?.level > 1) {
      // Store level in local storage to detect level changes
      const prevLevel = parseInt(localStorage.getItem('userLevel') || '1');
      
      if (profile.level > prevLevel) {
        setLevelUpNotification({
          visible: true,
          message: `Congratulations! You reached Level ${profile.level}!`
        });
        
        localStorage.setItem('userLevel', profile.level.toString());
      }
    }
  }, [profile]);

  const handleSelectProblem = (index: number) => {
    setCurrentProblemIndex(index);
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
        onLevelUpNotificationClose={() => setLevelUpNotification({ ...levelUpNotification, visible: false })}
      />
    </div>
  );
};

export default HardProblems;
