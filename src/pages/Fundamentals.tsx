
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

const Fundamentals = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const currentProblem = fundamentalProblems[currentProblemIndex];

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

  if (isPyodideLoading) {
    return <LoadingOverlay />;
  }

  return (
    <FundamentalsLayout currentProblemIndex={currentProblemIndex}>
      <ProblemNavigation
        problems={fundamentalProblems}
        currentProblemIndex={currentProblemIndex}
        onSelectProblem={handleSelectProblem}
      />
      
      <div className="mt-4 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-14rem)]">
        <ProblemSection problem={currentProblem} className="lg:col-span-2" />
        
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
