
import React from 'react';
import { Problem } from '@/data/problems';
import ProblemDescription from '@/components/ProblemDescription';

interface ProblemSectionProps {
  problem: Problem;
  className?: string;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ problem, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col ${className || ''}`}>
      <h2 className="text-lg font-semibold p-4 border-b">Problem</h2>
      <div className="flex-1 overflow-hidden">
        <ProblemDescription problem={problem} />
      </div>
    </div>
  );
};

export default ProblemSection;
