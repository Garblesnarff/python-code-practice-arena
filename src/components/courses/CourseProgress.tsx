
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseProgress as CourseProgressType, Topic } from '@/types/user';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';

interface CourseProgressProps {
  courseId: string;
  progress: CourseProgressType | null;
  topics: Topic[];
}

const CourseProgressWidget: React.FC<CourseProgressProps> = ({ courseId, progress, topics }) => {
  const progressPercentage = progress && progress.total_problems > 0
    ? (progress.problems_completed / progress.total_problems) * 100
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>{progress?.problems_completed || 0} completed</span>
          <span>{progress?.total_problems || 0} total</span>
        </div>
        <Progress value={progressPercentage} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
          <span>
            {progress?.problems_completed || 0} / {progress?.total_problems || 0} exercises completed
          </span>
        </div>
        <div className="flex items-center text-sm">
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          <span>
            {progress?.is_completed ? 'Course completed' : 'Course in progress'}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-orange-500" />
          <span>
            Last accessed: {progress?.last_accessed_timestamp 
              ? new Date(progress.last_accessed_timestamp).toLocaleDateString() 
              : 'Never'}
          </span>
        </div>
      </div>
      
      {topics.length > 0 && (
        <Button className="w-full mt-6" asChild>
          <Link to={`/courses/${courseId}/topics/${topics[0].id}`}>
            {progress?.problems_completed ? 'Continue Learning' : 'Start Course'}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default CourseProgressWidget;
