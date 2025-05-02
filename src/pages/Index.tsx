
import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import ProblemDescription from '@/components/ProblemDescription';
import TestResults from '@/components/TestResults';
import ProblemNavigation from '@/components/ProblemNavigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { problems } from '@/data/problems';
import { executePythonCode, ExecutionResult, initPyodide } from '@/services/pythonService';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const currentProblem = problems[currentProblemIndex];

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

  if (isPyodideLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Python Practice Arena</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <ProblemNavigation
            problems={problems}
            currentProblemIndex={currentProblemIndex}
            onSelectProblem={handleSelectProblem}
          />
          
          <div className="mt-4 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-14rem)]">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col">
              <h2 className="text-lg font-semibold p-4 border-b">Problem</h2>
              <div className="flex-1 overflow-hidden">
                <ProblemDescription problem={currentProblem} />
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col h-1/2">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Code Editor</h2>
                  <Button onClick={handleRunTests} disabled={isExecuting}>
                    {isExecuting ? 'Running...' : 'Run Tests'}
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <CodeEditor 
                    code={code} 
                    onChange={handleCodeChange} 
                    isExecuting={isExecuting}
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col h-1/2">
                <h2 className="text-lg font-semibold p-4 border-b">Results</h2>
                <div className="flex-1 overflow-hidden">
                  <TestResults results={testResults} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-gray-500">
          Python Coding Practice Arena - Practice your coding skills for technical interviews
        </div>
      </footer>
    </div>
  );
};

export default Index;
