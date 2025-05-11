
import React from 'react';
import { course1Problems } from '@/data/problems';
import ProblemPageLayout from '@/components/problems/ProblemPageLayout';

const Course1ProblemsPage: React.FC = () => {
  return (
    <ProblemPageLayout
      problems={course1Problems}
      difficultyLevel="course-1"
      basePath="/course-1"
      title="Python Foundations for Beginners"
    />
  );
};

export default Course1ProblemsPage;
