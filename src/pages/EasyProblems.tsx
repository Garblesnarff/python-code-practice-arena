import React, { useState, useEffect } from 'react';
import { easyProblems } from '@/data/problems/easy-problems';
import { executePythonCode, ExecutionResult, initPyodide } from '@/services/pythonService';
import { useToast } from '@/components/ui/use-toast';
import LoadingOverlay from '@/components/LoadingOverlay';
import Header from '@/components/problem-page/Header';
import Footer from '@/components/problem-page/Footer';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import ProblemNavigation from '@/components/ProblemNavigation';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import { useAuth } from '@/contexts/AuthContext';
import { completeProblem, getCompletedProblems } from '@/services/gamificationService';
import XPNotification from '@/components/XPNotification';
import { useNavigate } from 'react-router-dom';
import { CompletedProblem } from '@/types/user';
import { useProfileData } from '@/hooks/useProfileData';

const EasyProblems = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  const [xpNotification, setXpNotification] = useState({ 
    visible: false, 
    message: '', 
    type: 'xp' as 'xp' | 'level' | 'achievement' 
  });
  const [levelUpNotification, setLevelUpNotification] = useState({
    visible: false,
    message: '',
    prevLevel: 0,
    newLevel: 0
  });
  const { toast } = useToast();
  const { user, profile, refreshProfile } = useAuth();
  const { refreshAllProfileData } = useProfileData();
  const navigate = useNavigate();

  const currentProblem = easyProblems[currentProblemIndex];

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !isPyodideLoading) {
      navigate('/auth');
    }
  }, [user, isPyodideLoading, navigate]);

  // Load Pyodide when the component mounts
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setIsPyodideLoading(true);
        await initPyodide();
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize Python environment. Please reload the page.',
          variant: 'destructive'
        });
      } finally {
        setIsPyodideLoading(false);
      }
    };

    loadPyodide();
  }, [toast]);

  // Load completed problems when user changes
  useEffect(() => {
    const loadCompletedProblems = async () => {
      if (user) {
        const problems = await getCompletedProblems(user.id);
        setCompletedProblems(problems);
      }
    };
    
    loadCompletedProblems();
  }, [user]);

  // Reset code and test results when problem changes
  useEffect(() => {
    setCode(currentProblem?.starter_code || '');
    setTestResults(null);
  }, [currentProblemIndex, currentProblem?.starter_code]);

  // Watch for level changes
  useEffect(() => {
    if (profile && profile?.level > 1) {
      // Store level in local storage to detect level changes
      const prevLevel = parseInt(localStorage.getItem('userLevel') || '1');
      
      if (profile.level > prevLevel) {
        setLevelUpNotification({
          visible: true,
          message: `Congratulations! You reached Level ${profile.level}!`,
          prevLevel,
          newLevel: profile.level
        });
        
        localStorage.setItem('userLevel', profile.level.toString());
      }
    }
  }, [profile]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSelectProblem = (index: number) => {
    setCurrentProblemIndex(index);
  };

  const handleRunTests = async () => {
    if (!code.trim()) {
      toast({
        title: 'Empty Solution',
        description: 'Please write some code before running tests.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsExecuting(true);
      const results = await executePythonCode(code, currentProblem.test_cases);
      setTestResults(results);
      
      // Check if all tests passed and award XP
      if (results.summary.passed === results.summary.total && user) {
        // Check if problem already completed
        const isAlreadyCompleted = completedProblems.some(
          p => p.problem_id === currentProblem.id
        );
        
        if (!isAlreadyCompleted) {
          const prevLevel = profile?.level || 1;
          const { success, xpGained } = await completeProblem(
            user.id,
            currentProblem.id,
            'easy'
          );
          
          if (success && xpGained > 0) {
            // Refresh profile data to update XP and level
            await refreshAllProfileData();
            
            // Show XP notification
            setXpNotification({
              visible: true,
              message: `+${xpGained} XP gained!`,
              type: 'xp'
            });
            
            // Refresh completed problems
            const problems = await getCompletedProblems(user.id);
            setCompletedProblems(problems);
            
            // Get updated profile
            const updatedProfile = await refreshProfile();
            
            // Check for level up
            if (updatedProfile && updatedProfile.level > prevLevel) {
              setTimeout(() => {
                setXpNotification({
                  visible: true,
                  message: `Level up! You're now level ${updatedProfile.level}!`,
                  type: 'level'
                });
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
    } catch (error) {
      console.error('Error running tests:', error);
      toast({
        title: 'Execution Error',
        description: error instanceof Error ? error.message : 'An error occurred while running your code.',
        variant: 'destructive'
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClearCode = () => {
    setCode(currentProblem?.starter_code || '');
    setTestResults(null);
    
    toast({
      title: 'Code Reset',
      description: 'Your code has been reset to the starter code.',
      variant: 'default'
    });
  };

  const isProblemCompleted = (problemId: string) => {
    return completedProblems.some(p => p.problem_id === problemId);
  };

  if (isPyodideLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header title="Easy Python Problems" />

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <BreadcrumbNav 
            difficulty="Easy" 
            currentProblemIndex={currentProblemIndex} 
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
                  {completedProblems.filter(p => p.difficulty === 'easy').length} / {easyProblems.length} completed
                </div>
              </div>
            </div>
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
        onClose={() => setXpNotification({ ...xpNotification, visible: false })}
      />
      
      {/* Level Up Notification */}
      <XPNotification
        message={levelUpNotification.message}
        type="level"
        visible={levelUpNotification.visible}
        onClose={() => setLevelUpNotification({ ...levelUpNotification, visible: false })}
      />
    </div>
  );
};

export default EasyProblems;
