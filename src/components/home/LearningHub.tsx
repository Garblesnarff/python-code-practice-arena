
import React from 'react';
import { Course, CourseProgress } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CourseCards from '@/components/home/CourseCards';
import { Trophy, CheckCircle2, BookOpen } from 'lucide-react';

interface LearningHubProps {
  courses: Course[];
  progress?: CourseProgress[];
  totalCompletedProblems: number;
  totalAchievements: number;
  className?: string;
}

const LearningHub: React.FC<LearningHubProps> = ({ 
  courses,
  progress = [],
  totalCompletedProblems,
  totalAchievements,
  className = ''
}) => {
  // Calculate recommended next course based on progress
  const getRecommendedCourse = () => {
    // First look for courses in progress
    const inProgressCourses = courses.filter(course => {
      const courseProgress = progress.find(p => p.course_id === course.id);
      return courseProgress && courseProgress.problems_completed > 0 && !courseProgress.is_completed;
    });
    
    if (inProgressCourses.length > 0) {
      // Return the course with the lowest sequence number that's in progress
      return inProgressCourses.sort((a, b) => a.sequence_number - b.sequence_number)[0];
    }
    
    // If no courses in progress, find the first not started
    const notStartedCourses = courses.filter(course => {
      const courseProgress = progress.find(p => p.course_id === course.id);
      return !courseProgress || courseProgress.problems_completed === 0;
    });
    
    if (notStartedCourses.length > 0) {
      return notStartedCourses.sort((a, b) => a.sequence_number - b.sequence_number)[0];
    }
    
    // If all courses completed or no courses, return first course
    return courses[0];
  };
  
  const recommendedCourse = getRecommendedCourse();
  
  return (
    <div className={className}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Learning Hub</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and continue your Python learning journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              Problems Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalCompletedProblems}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {progress.filter(p => p.is_completed).length} / {courses.length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Achievements Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalAchievements}</p>
          </CardContent>
        </Card>
      </div>
      
      {recommendedCourse && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended Next</h2>
          <CourseCards courses={[recommendedCourse]} progress={progress} />
        </div>
      )}
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        <CourseCards courses={courses} progress={progress} />
      </div>
    </div>
  );
};

export default LearningHub;
