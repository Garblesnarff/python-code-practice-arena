
import { useState } from 'react';
import { executePythonCode, ExecutionResult } from '@/services/pythonService';
import { useToast } from '@/components/ui/use-toast';
import { Problem, normalizeProblem } from '@/data/problems/types';

export const useCodeExecution = (problem: Problem) => {
  // Normalize problem to ensure starter_code and initial_code are consistent
  const normalizedProblem = normalizeProblem(problem);
  const [code, setCode] = useState(normalizedProblem?.initial_code || '');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  // Reset code and test results when problem changes
  const resetCode = () => {
    setCode(normalizedProblem?.initial_code || '');
    setTestResults(null);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleClearCode = () => {
    resetCode();
    
    toast({
      title: 'Code Reset',
      description: 'Your code has been reset to the starter code.',
      variant: 'default'
    });
  };

  const executeCode = async (testCases: any[]) => {
    if (!code.trim()) {
      toast({
        title: 'Empty Solution',
        description: 'Please write some code before running tests.',
        variant: 'destructive'
      });
      return null;
    }

    try {
      setIsExecuting(true);
      const results = await executePythonCode(code, testCases);
      setTestResults(results);
      return results;
    } catch (error) {
      console.error('Error running tests:', error);
      toast({
        title: 'Execution Error',
        description: error instanceof Error ? error.message : 'An error occurred while running your code.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    code,
    testResults,
    isExecuting,
    handleCodeChange,
    executeCode,
    handleClearCode,
    resetCode
  };
};
