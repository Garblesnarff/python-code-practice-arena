
import React from 'react';
import { Link } from 'react-router-dom';
import { Course, CourseProgress } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';

interface LearningPathVisualizerProps {
  courses: Course[];
  progress: CourseProgress[];
  currentCourseId?: string;
}

const LearningPathVisualizer = ({ courses, progress, currentCourseId }: LearningPathVisualizerProps) => {
  // Sort courses by sequence number
  const sortedCourses = [...courses].sort((a, b) => a.sequence_number - b.sequence_number);
  
  // Create a map of course progress for easier lookup
  const courseProgressMap = new Map<string, CourseProgress>();
  progress.forEach(p => courseProgressMap.set(p.course_id, p));
  
  // Function to determine if a course is locked (prerequisites not completed)
  const isCourseLocked = (course: Course): boolean => {
    if (!course.prerequisite_course_ids || course.prerequisite_course_ids.length === 0) {
      return false; // No prerequisites
    }
    
    // Check if all prerequisites are completed
    for (const prereqId of course.prerequisite_course_ids) {
      const prereqProgress = courseProgressMap.get(prereqId);
      if (!prereqProgress || !prereqProgress.is_completed) {
        return true; // At least one prerequisite not completed
      }
    }
    
    return false;
  };
  
  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4">Your Learning Path</h2>
      
      <div className="flex flex-col md:flex-row gap-2 items-center justify-center mb-8">
        {sortedCourses.map((course, index) => {
          const courseProgress = courseProgressMap.get(course.id);
          const progressPercent = courseProgress 
            ? (courseProgress.problems_completed / Math.max(1, courseProgress.total_problems)) * 100 
            : 0;
          const isLocked = isCourseLocked(course);
          const isCompleted = courseProgress?.is_completed || false;
          const isCurrent = course.id === currentCourseId;
          
          return (
            <React.Fragment key={course.id}>
              <Link 
                to={isLocked ? '#' : `/courses/${course.id}`} 
                className={`block w-full md:w-auto ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <Card className={`${isCurrent ? 'border-primary border-2' : ''} hover:shadow-md transition-shadow`}>
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>{course.title}</span>
                      {isLocked && <Lock className="h-4 w-4" />}
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <Progress 
                      value={progressPercent} 
                      className="h-2" 
                    />
                  </CardContent>
                </Card>
              </Link>
              
              {index < sortedCourses.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRight className="mx-1" />
                </div>
              )}
              
              {index < sortedCourses.length - 1 && (
                <div className="md:hidden my-1">
                  <ArrowRight className="rotate-90" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathVisualizer;
