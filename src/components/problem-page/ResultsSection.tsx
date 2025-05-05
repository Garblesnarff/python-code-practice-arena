
import React from 'react';
import TestResults from '@/components/TestResults';
import { ExecutionResult } from '@/services/pythonService';

interface ResultsSectionProps {
  results: ExecutionResult | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col h-1/2">
      <h2 className="text-lg font-semibold p-4 border-b">Results</h2>
      <div className="flex-1 overflow-hidden">
        <TestResults results={results} />
      </div>
    </div>
  );
};

export default ResultsSection;
