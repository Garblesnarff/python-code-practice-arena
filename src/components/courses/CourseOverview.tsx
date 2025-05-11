
import React from 'react';
import { Course } from '@/types/user';

interface CourseOverviewProps {
  course: Course;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
      <p className="mb-6">{course.description}</p>
      
      <h3 className="text-lg font-medium mb-3">Learning Objectives</h3>
      <ul className="list-disc pl-5 space-y-2">
        {course.learning_objectives?.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOverview;
