
import React from 'react';
import { Course } from '@/types/user';

interface PrerequisitesCoursesProps {
  course: Course;
}

const PrerequisitesCourses: React.FC<PrerequisitesCoursesProps> = ({ course }) => {
  const hasPrerequisites = course.prerequisite_course_ids && course.prerequisite_course_ids.length > 0;
  
  if (!hasPrerequisites) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-2">Prerequisites</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        We recommend completing these courses first:
      </p>
      <div className="space-y-2">
        {/* Placeholder for prerequisite courses - in real implementation we'd fetch them */}
        <p className="text-sm">This feature will be implemented soon.</p>
      </div>
    </div>
  );
};

export default PrerequisitesCourses;
