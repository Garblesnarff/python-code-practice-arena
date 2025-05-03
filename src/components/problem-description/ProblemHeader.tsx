
import React from 'react';
import { Problem } from '@/data/problems';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

interface ProblemHeaderProps {
  problem: Problem;
  getDifficultyColor: (difficulty: string) => string;
}

const ProblemHeader: React.FC<ProblemHeaderProps> = ({ problem, getDifficultyColor }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <Badge className={`${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </Badge>
      </div>
      
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>{problem.description}</ReactMarkdown>
      </div>
    </>
  );
};

export default ProblemHeader;
