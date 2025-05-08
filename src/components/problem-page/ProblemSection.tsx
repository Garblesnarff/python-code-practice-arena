
import React from 'react';
import ProblemDescription from '@/components/ProblemDescription';
import { Problem } from '@/data/problems/types';
import { CheckCircle } from 'lucide-react';

interface ProblemSectionProps {
  problem: Problem;
  isCompleted?: boolean;
  className?: string;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ 
  problem, 
  isCompleted = false,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col ${className}`}>
      <h2 className="text-lg font-semibold p-4 border-b flex items-center justify-between">
        <span>Problem</span>
        <div className="flex items-center">
          {isCompleted && (
            <div className="mr-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </div>
          )}
          <span className="text-sm text-gray-500 font-normal">Scroll to see all content</span>
        </div>
      </h2>
      <div className="flex-1 overflow-hidden">
        <ProblemDescription problem={problem} />
      </div>
    </div>
  );
};

export default ProblemSection;
