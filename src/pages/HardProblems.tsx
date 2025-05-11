
import React from 'react';
import { hardProblems } from '@/data/problems';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const HardProblems: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={hardProblems}
      difficultyLevel="hard"
      basePath="/hard"
      title="Hard Python Problems"
    />
  );
};

export default HardProblems;
