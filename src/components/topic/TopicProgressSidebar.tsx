
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Problem } from '@/data/problems/types';

interface TopicProgressSidebarProps {
  problemsCompleted: number;
  totalProblems: number;
  progressPercentage: number;
  courseId: string;
  topicId: string;
  firstProblemId?: string;
}

const TopicProgressSidebar: React.FC<TopicProgressSidebarProps> = ({
  problemsCompleted,
  totalProblems,
  progressPercentage,
  courseId,
  topicId,
  firstProblemId
}) => {
  return (
    <div className="lg:col-span-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 sticky top-6">
        <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span>{problemsCompleted} completed</span>
            <span>{totalProblems} total</span>
          </div>
          <Progress value={progressPercentage} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
            <span>
              {problemsCompleted} / {totalProblems} problems completed
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
            <span>
              {progressPercentage === 100 ? 'Topic completed' : 'Topic in progress'}
            </span>
          </div>
        </div>
        
        {firstProblemId && (
          <Button className="w-full mt-6" asChild>
            <Link to={`/courses/${courseId}/topics/${topicId}/problems/${firstProblemId}`}>
              {problemsCompleted > 0 ? 'Continue Learning' : 'Start Topic'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopicProgressSidebar;
