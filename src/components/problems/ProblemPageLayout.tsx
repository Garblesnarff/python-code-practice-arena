
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Problem } from '@/data/problems/types';
import { useAuth } from '@/contexts/AuthContext';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import LoadingOverlay from '@/components/LoadingOverlay';
import Header from '@/components/problem-page/Header';
import Footer from '@/components/problem-page/Footer';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import ProblemNavigation from '@/components/ProblemNavigation';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import ProfileStatusBar from '@/components/problem-page/ProfileStatusBar';
import NavigationBar from '@/components/layout/NavigationBar';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';

interface ProblemPageLayoutProps {
  problems: Problem[];
  difficultyLevel: 'easy' | 'medium' | 'hard';
  basePath: string;
  title: string;
}

const ProblemPageLayout: React.FC<ProblemPageLayoutProps> = ({
  problems,
  difficultyLevel,
  basePath,
  title
}) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const currentProblem = problems[currentProblemIndex];
  
  // Use the problem execution hook
  const {
    code,
    testResults,
    isPyodideLoading,
    isExecuting,
    xpNotification,
    levelUpNotification,
    completedProblems,
    isProblemCompleted,
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose,
    handleLevelUpNotificationClose
  } = useProblemExecution({
    problem: currentProblem,
    difficulty: difficultyLevel
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !isPyodideLoading) {
      navigate('/auth');
    }
  }, [user, isPyodideLoading, navigate]);

  const handleSelectProblem = (index: number) => {
    setCurrentProblemIndex(index);
  };

  if (isPyodideLoading) {
    return <LoadingOverlay />;
  }

  const completedCount = completedProblems.filter(p => p.difficulty === difficultyLevel).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      <Header title={title} />

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: `${difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)} Problems`, href: basePath },
              { label: `Problem ${currentProblemIndex + 1}`, href: '#' }
            ]}
          />
          
          {user && profile && (
            <ProfileStatusBar 
              profile={profile}
              completedCount={completedCount}
              totalProblems={problems.length}
            />
          )}
          
          <ProblemNavigation
            problems={problems}
            currentProblemIndex={currentProblemIndex}
            onSelectProblem={handleSelectProblem}
            completedProblems={completedProblems.map(p => p.problem_id)}
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

export default ProblemPageLayout;
