
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course, CourseProgress } from '@/types/user';
import { BookOpen, Clock, ChevronRight, Layers, Database, Braces, Code } from 'lucide-react';

interface CourseCardsProps {
  courses: Course[];
  progress?: CourseProgress[];
  className?: string;
}

const getCourseIcon = (iconName?: string, sequenceNumber?: number) => {
  switch (iconName || sequenceNumber) {
    case 'Blocks':
    case 1:
      return <Layers className="h-8 w-8 text-blue-500" />;
    case 'Collection':
    case 2:
      return <Database className="h-8 w-8 text-green-500" />;
    case 3:
      return <Braces className="h-8 w-8 text-purple-500" />;
    default:
      return <Code className="h-8 w-8 text-gray-500" />;
  }
};

const getDifficultyLabel = (sequenceNumber: number) => {
  if (sequenceNumber <= 2) return 'Beginner';
  if (sequenceNumber <= 5) return 'Intermediate';
  return 'Advanced';
};

const getDifficultyColor = (sequenceNumber: number) => {
  if (sequenceNumber <= 2) return 'bg-green-100 text-green-800';
  if (sequenceNumber <= 5) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const estimateDuration = (sequenceNumber: number) => {
  if (sequenceNumber <= 2) return '2-3 hours';
  if (sequenceNumber <= 5) return '4-6 hours';
  return '8-10 hours';
};

const CourseCards: React.FC<CourseCardsProps> = ({ courses, progress = [], className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {courses.map((course) => {
        const courseProgress = progress.find(p => p.course_id === course.id);
        const progressPercentage = courseProgress 
          ? (courseProgress.problems_completed / (courseProgress.total_problems || 1)) * 100
          : 0;
        
        return (
          <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {getCourseIcon(course.icon, course.sequence_number)}
                <Badge className={`font-normal ${getDifficultyColor(course.sequence_number)}`}>
                  {getDifficultyLabel(course.sequence_number)}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{estimateDuration(course.sequence_number)}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {courseProgress?.problems_completed || 0} / {courseProgress?.total_problems || '?'} exercises
                  </span>
                </div>
                
                <div className="pt-1">
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                to={`/courses/${course.id}`} 
                className="text-primary flex items-center hover:underline w-full justify-end"
              >
                Begin Learning <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseCards;
