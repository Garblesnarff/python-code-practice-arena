
import React from 'react';
import { easyProblems } from '@/data/problems/easy-problems';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const EasyProblems: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={easyProblems}
      difficultyLevel="easy"
      basePath="/easy"
      title="Easy Python Problems"
    />
  );
};

export default EasyProblems;
