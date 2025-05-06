
import React, { useState, useEffect } from 'react';
import { fundamentalProblems } from '@/data/fundamentals';
import { executePythonCode, ExecutionResult, initPyodide } from '@/services/pythonService';
import { useToast } from '@/components/ui/use-toast';
import LoadingOverlay from '@/components/LoadingOverlay';
import ProblemNavigation from '@/components/ProblemNavigation';
import TestResults from '@/components/TestResults';
import FundamentalsLayout from '@/components/fundamentals/FundamentalsLayout';
import ProblemSection from '@/components/fundamentals/ProblemSection';
import CodeEditorSection from '@/components/fundamentals/CodeEditorSection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { completeProblem, getCompletedProblems } from '@/services/gamificationService';
import { CompletedProblem } from '@/types/user';
import XPNotification from '@/components/XPNotification';

const Fundamentals = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  
  // XP Notification States
  const [xpNotification, setXpNotification] = useState({
    visible: false,
    message: '',
    type: 'xp' as 'xp' | 'level' | 'achievement'
  });
  
  const currentProblem = fundamentalProblems[currentProblemIndex];
  
  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to track your progress and earn XP.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, loading, navigate, toast]);
  
  // Load user's completed problems
  useEffect(() => {
    const fetchCompletedProblems = async () => {
      if (user) {
        const problems = await getCompletedProblems(user.id);
        setCompletedProblems(problems);
      }
    };
    
    if (!loading && user) {
      fetchCompletedProblems();
    }
  }, [user, loading]);

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

  // Reset code and test results when problem changes
  useEffect(() => {
    setCode(currentProblem?.starter_code || '');
    setTestResults(null);
  }, [currentProblemIndex, currentProblem?.starter_code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSelectProblem = (index: number) => {
    setCurrentProblemIndex(index);
  };

  // Check if the current problem has been completed by the user
  const isProblemCompleted = (problemId: string) => {
    return completedProblems.some(problem => problem.problem_id === problemId);
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
      
      if (results.summary.passed === results.summary.total) {
        toast({
          title: 'Success!',
          description: `All ${results.summary.total} tests passed! 🎉`,
          variant: 'default'
        });
        
        // Mark problem as completed and award XP if not already completed
        if (user && !isProblemCompleted(currentProblem.id)) {
          try {
            const prevLevel = profile?.level || 1;
            const { success, xpGained } = await completeProblem(
              user.id,
              currentProblem.id,
              'fundamentals'
            );
            
            if (success && xpGained > 0) {
              // Show XP notification
              setXpNotification({
                visible: true,
                message: `+${xpGained} XP earned!`,
                type: 'xp'
              });
              
              // Refresh completed problems
              const updatedProblems = await getCompletedProblems(user.id);
              setCompletedProblems(updatedProblems);
              
              // Check for level up
              if (profile && profile.level > prevLevel) {
                setTimeout(() => {
                  setXpNotification({
                    visible: true,
                    message: `Level up! You're now level ${profile.level}!`,
                    type: 'level'
                  });
                }, 4000); // Show after the XP notification disappears
              }
            }
          } catch (error) {
            console.error('Error awarding XP:', error);
          }
        }
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
  
  const handleNotificationClose = () => {
    setXpNotification({...xpNotification, visible: false});
  };

  if (isPyodideLoading || loading) {
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
      <XPNotification 
        message={xpNotification.message}
        type={xpNotification.type}
        visible={xpNotification.visible}
        onClose={handleNotificationClose}
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
