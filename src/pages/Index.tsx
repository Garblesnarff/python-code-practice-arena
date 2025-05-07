
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import CourseCards from '@/components/home/CourseCards';
import LearningPathVisualizer from '@/components/home/LearningPathVisualizer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { getCourses, getAllCourseProgress } from '@/services/courseService';
import { Course, CourseProgress } from '@/types/user';

const Index = () => {
  const { user, profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        
        if (user) {
          const progressData = await getAllCourseProgress(user.id);
          setCourseProgress(progressData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);
  
  // Find the most recent course the user has accessed
  const getLastAccessedCourse = (): { course: Course; progress: CourseProgress } | null => {
    if (!courseProgress.length) return null;
    
    let mostRecentProgress = courseProgress[0];
    for (const progress of courseProgress) {
      if (!mostRecentProgress.last_accessed_timestamp || 
          (progress.last_accessed_timestamp && 
           new Date(progress.last_accessed_timestamp) > new Date(mostRecentProgress.last_accessed_timestamp))) {
        mostRecentProgress = progress;
      }
    }
    
    const course = courses.find(c => c.id === mostRecentProgress.course_id);
    return course ? { course, progress: mostRecentProgress } : null;
  };
  
  const recentCourse = getLastAccessedCourse();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Python Learning Arena
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Master Python programming through our comprehensive seven-course curriculum 
              designed to take you from beginner to advanced!
            </p>
            {!user && (
              <Button asChild size="lg">
                <Link to="/auth">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In to Get Started
                </Link>
              </Button>
            )}
          </div>
        </section>

        {user && recentCourse && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <Card>
              <CardHeader>
                <CardTitle>{recentCourse.course.title}</CardTitle>
                <CardDescription>
                  Last accessed: {recentCourse.progress.last_accessed_timestamp 
                    ? new Date(recentCourse.progress.last_accessed_timestamp).toLocaleDateString() 
                    : 'Never'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>
                      {recentCourse.progress.problems_completed} / {Math.max(1, recentCourse.progress.total_problems)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ 
                        width: `${(recentCourse.progress.problems_completed / Math.max(1, recentCourse.progress.total_problems)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {recentCourse.course.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/courses/${recentCourse.course.id}`}>
                    Continue Course
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
        )}
        
        {user && (
          <section className="mb-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <LearningPathVisualizer 
              courses={courses} 
              progress={courseProgress} 
              currentCourseId={recentCourse?.course.id}
            />
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">All Courses</h2>
          <CourseCards courses={courses} progress={courseProgress} />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
