
import React from 'react';
import { fundamentalProblems } from '@/data/fundamentals';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const FundamentalProblemsPage: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={fundamentalProblems}
      difficultyLevel="fundamental"
      basePath="/fundamentals"
      title="Python Fundamentals"
    />
  );
};

export default FundamentalProblemsPage;
