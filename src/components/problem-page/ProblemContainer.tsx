
import React from 'react';
import { ExecutionResult } from '@/services/pythonService';
import { Problem } from '@/data/problems/types';
import ProblemSection from './ProblemSection';
import CodeEditorSection from './CodeEditorSection';
import ResultsSection from './ResultsSection';

interface ProblemContainerProps {
  problem: Problem;
  code: string;
  testResults: ExecutionResult | null;
  isExecuting: boolean;
  onCodeChange: (newCode: string) => void;
  onRunTests: () => void;
  onClearCode: () => void;
  isCompleted?: boolean;
}

const ProblemContainer: React.FC<ProblemContainerProps> = ({
  problem,
  code,
  testResults,
  isExecuting,
  onCodeChange,
  onRunTests,
  onClearCode,
  isCompleted = false
}) => {
  return (
    <div className="mt-4 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-14rem)]">
      <ProblemSection problem={problem} isCompleted={isCompleted} />
      
      <div className="flex flex-col gap-6">
        <CodeEditorSection 
          code={code}
          isExecuting={isExecuting}
          onChange={onCodeChange}
          onRun={onRunTests}
          onClear={onClearCode}
        />
        
        <ResultsSection results={testResults} />
      </div>
    </div>
  );
};

export default ProblemContainer;
