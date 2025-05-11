
import React from 'react';
import { mediumProblems } from '@/data/problems/medium-problems';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const MediumProblems: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={mediumProblems}
      difficultyLevel="medium"
      basePath="/medium"
      title="Medium Python Problems"
    />
  );
};

export default MediumProblems;
