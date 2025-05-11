
import React from 'react';
import { Link } from 'react-router-dom';
import { Topic } from '@/types/user';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseTopicsProps {
  courseId: string;
  topics: Topic[];
}

const CourseTopics: React.FC<CourseTopicsProps> = ({ courseId, topics }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Course Topics</h2>
      
      {topics.length === 0 ? (
        <p>No topics available for this course yet.</p>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <Card key={topic.id}>
              <CardHeader className="pb-2">
                <CardTitle>{topic.title}</CardTitle>
                {topic.description && (
                  <CardDescription>{topic.description}</CardDescription>
                )}
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/courses/${courseId}/topics/${topic.id}`}>
                    Start Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTopics;
