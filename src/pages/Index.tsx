
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useProfileData } from '@/hooks/useProfileData';
import { getCourses, getAllCourseProgress } from '@/services/courseService';
import { Course, CourseProgress } from '@/types/user';
import LearningHub from '@/components/home/LearningHub';

const Index = () => {
  const { user, profile } = useAuth();
  const { completedProblems, achievements } = useProfileData();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load courses and progress
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
        console.error('Error loading courses data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load course data.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user, toast]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Python Learning Arena</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Master Python programming through interactive exercises</p>
            </div>
            {!user && (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
            {user && (
              <Link to="/profile">
                <Button variant="outline">My Profile</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {user && profile ? (
          <LearningHub 
            courses={courses}
            progress={courseProgress}
            totalCompletedProblems={completedProblems.length}
            totalAchievements={achievements.length}
          />
        ) : (
          <div>
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Welcome to Python Learning Arena</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4">
                    Begin your journey to Python mastery with our structured learning path. Our platform offers:
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Comprehensive 7-course curriculum from basics to advanced topics</li>
                    <li>Interactive exercises with real-time feedback</li>
                    <li>Progress tracking and achievements</li>
                    <li>Built-in Python execution environment - no installation required</li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/auth">
                      <Button size="lg">Start Learning Now</Button>
                    </Link>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Learning Path</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Python Foundations for Beginners</li>
                    <li>Learning Simple Data Structures in Python</li>
                    <li>Control Flow and Functions</li>
                    <li>Object-Oriented Programming</li>
                    <li>File Handling and Modules</li>
                    <li>Error Handling and Debugging</li>
                    <li>Advanced Python Concepts</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                  <p>Loading courses...</p>
                ) : (
                  courses.slice(0, 3).map(course => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Learning objectives:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {course.learning_objectives?.slice(0, 2).map((objective, i) => (
                            <li key={i} className="text-sm">{objective}</li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link to="/auth" className="w-full">
                          <Button variant="outline" className="w-full">Sign in to Start</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Python Learning Arena. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
