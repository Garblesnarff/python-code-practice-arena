
import { useState, useEffect } from 'react';
import { executePythonCode, ExecutionResult, initPyodide } from '@/services/pythonService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { completeProblem, getCompletedProblems } from '@/services/gamificationService';
import { CompletedProblem } from '@/types/user';
import { useProfileData } from '@/hooks/useProfileData';
import { Problem } from '@/data/problems';

interface UseProblemExecutionProps {
  problem: Problem;
  difficulty: string;
}

export const useProblemExecution = ({ problem, difficulty }: UseProblemExecutionProps) => {
  const [code, setCode] = useState(problem?.starter_code || '');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  const [xpNotification, setXpNotification] = useState({ 
    visible: false, 
    message: '', 
    type: 'xp' as 'xp' | 'level' | 'achievement' 
  });
  
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { refreshAllProfileData } = useProfileData();

  // Load Pyodide when the hook mounts
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
    setCode(problem?.starter_code || '');
    setTestResults(null);
  }, [problem]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const isProblemCompleted = (problemId: string) => {
    return completedProblems.some(p => p.problem_id === problemId);
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
      const results = await executePythonCode(code, problem.test_cases);
      setTestResults(results);
      
      // Check if all tests passed and award XP
      if (results.summary.passed === results.summary.total && user) {
        // Check if problem already completed
        const isAlreadyCompleted = isProblemCompleted(problem.id);
        
        if (!isAlreadyCompleted) {
          const prevLevel = profile?.level || 1;
          const { success, xpGained } = await completeProblem(
            user.id,
            problem.id,
            difficulty
          );
          
          if (success && xpGained > 0) {
            // Refresh profile data to update XP and level
            const updatedProfile = await refreshAllProfileData();
            
            // Show XP notification
            setXpNotification({
              visible: true,
              message: `+${xpGained} XP gained!`,
              type: 'xp'
            });
            
            // Refresh completed problems
            const problems = await getCompletedProblems(user.id);
            setCompletedProblems(problems);
            
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
    setCode(problem?.starter_code || '');
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

  return {
    code,
    testResults,
    isPyodideLoading,
    isExecuting,
    xpNotification,
    completedProblems,
    isProblemCompleted: (id: string) => isProblemCompleted(id),
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose
  };
};
