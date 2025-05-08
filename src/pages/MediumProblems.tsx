
import React, { useState, useEffect } from 'react';
import { mediumProblems } from '@/data/problems/medium-problems';
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

const MediumProblems = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const currentProblem = mediumProblems[currentProblemIndex];
  
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
    difficulty: 'medium'
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header title="Medium Python Problems" />

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Medium Problems', href: '/medium' },
              { label: `Problem ${currentProblemIndex + 1}`, href: '#' }
            ]}
          />
          
          {user && profile && (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4 flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-sm font-medium">Level {profile.level}</div>
                  <div className="text-xs text-gray-500">{profile.xp} XP • {profile.xp_to_next_level} XP to next level</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  {completedProblems.filter(p => p.difficulty === 'medium').length} / {mediumProblems.length} completed
                </div>
              </div>
            </div>
          )}
          
          <ProblemNavigation
            problems={mediumProblems}
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

export default MediumProblems;
