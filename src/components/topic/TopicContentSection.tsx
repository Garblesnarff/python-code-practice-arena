
import React from 'react';
import TopicProblemList from './TopicProblemList';
import { Problem } from '@/data/problems/types';

interface TopicContentSectionProps {
  problems: Problem[];
  courseId: string;
  topicId: string;
  completedProblemIds: string[];
}

const TopicContentSection: React.FC<TopicContentSectionProps> = ({
  problems,
  courseId,
  topicId,
  completedProblemIds
}) => {
  return (
    <div className="lg:col-span-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Problems</h2>
        
        <TopicProblemList 
          problems={problems}
          courseId={courseId}
          topicId={topicId}
          completedProblemIds={completedProblemIds}
        />
      </div>
    </div>
  );
};

export default TopicContentSection;
