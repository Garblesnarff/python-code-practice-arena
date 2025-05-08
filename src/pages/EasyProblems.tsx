
import React, { useState, useEffect } from 'react';
import { easyProblems } from '@/data/problems/easy-problems';
import LoadingOverlay from '@/components/LoadingOverlay';
import Header from '@/components/problem-page/Header';
import Footer from '@/components/problem-page/Footer';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import ProblemNavigation from '@/components/ProblemNavigation';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import { useAuth } from '@/contexts/AuthContext';
import XPNotification from '@/components/XPNotification';
import { useNavigate } from 'react-router-dom';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import NavigationBar from '@/components/layout/NavigationBar';
import ProfileStatusBar from '@/components/problem-page/ProfileStatusBar';

const EasyProblems = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const currentProblem = easyProblems[currentProblemIndex];
  
  // Use our refactored hook
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
    difficulty: 'easy'
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

  const completedCount = completedProblems.filter(p => p.difficulty === 'easy').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      <Header title="Easy Python Problems" />

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Easy Problems', href: '/easy' },
              { label: `Problem ${currentProblemIndex + 1}`, href: '#' }
            ]}
          />
          
          {user && profile && (
            <ProfileStatusBar 
              profile={profile}
              completedCount={completedCount}
              totalProblems={easyProblems.length}
            />
          )}
          
          <ProblemNavigation
            problems={easyProblems}
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

      {/* XP Notification */}
      <XPNotification
        message={xpNotification.message}
        type={xpNotification.type}
        visible={xpNotification.visible}
        onClose={handleNotificationClose}
      />
      
      {/* Level Up Notification */}
      <XPNotification
        message={levelUpNotification.message}
        type="level"
        visible={levelUpNotification.visible}
        onClose={handleLevelUpNotificationClose}
      />
    </div>
  );
};

export default EasyProblems;
