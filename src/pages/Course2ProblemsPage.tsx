
import React from 'react';
import { course2Problems } from '@/data/problems';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const Course2ProblemsPage: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={course2Problems}
      difficultyLevel="course-2"
      basePath="/course-2"
      title="Learning Simple Data Structures in Python"
    />
  );
};

export default Course2ProblemsPage;
