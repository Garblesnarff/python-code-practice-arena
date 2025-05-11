
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem } from '@/data/problems/types';

interface TopicProblemListProps {
  problems: Problem[];
  courseId: string;
  topicId: string;
  completedProblemIds: string[];
}

const TopicProblemList: React.FC<TopicProblemListProps> = ({
  problems,
  courseId,
  topicId,
  completedProblemIds
}) => {
  if (problems.length === 0) {
    return <p>No problems available for this topic yet.</p>;
  }
  
  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <Card key={problem.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{problem.title}</CardTitle>
              {completedProblemIds.includes(problem.id) && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            <CardDescription>
              Difficulty: {problem.difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {problem.description.substring(0, 100)}...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to={`/courses/${courseId}/topics/${topicId}/problems/${problem.id}`}>
                {completedProblemIds.includes(problem.id) ? 'Review Problem' : 'Start Problem'}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopicProblemList;
