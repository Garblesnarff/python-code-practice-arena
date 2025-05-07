
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getCourseById, getTopicsByCourseId, getCourseProgress, updateCourseLastAccessed } from '@/services/courseService';
import { Course, Topic, CourseProgress } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import LoadingOverlay from '@/components/LoadingOverlay';
import Layout from '@/components/layout/Layout';

const CourseDashboard = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access course content.",
        variant: "default"
      });
      navigate('/auth');
      return;
    }
    
    const loadCourseData = async () => {
      setLoading(true);
      try {
        if (!courseId) return;
        
        const courseData = await getCourseById(courseId);
        if (!courseData) {
          toast({
            title: "Course Not Found",
            description: "The requested course could not be found.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        setCourse(courseData);
        
        const topicsData = await getTopicsByCourseId(courseId);
        setTopics(topicsData);
        
        if (user) {
          const progressData = await getCourseProgress(user.id, courseId);
          setProgress(progressData);
          
          // Update last accessed timestamp
          await updateCourseLastAccessed(user.id, courseId);
        }
      } catch (error) {
        console.error('Error loading course data:', error);
        toast({
          title: "Error",
          description: "Failed to load course data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseData();
  }, [courseId, user, toast, navigate]);
  
  if (loading) {
    return <LoadingOverlay />;
  }
  
  if (!course) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="mb-4">The course you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const progressPercentage = progress && progress.total_problems > 0
    ? (progress.problems_completed / progress.total_problems) * 100
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to="/">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to All Courses
          </Link>
        </Button>
        <h1 className="text-2xl font-bold mb-6">{course.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
              <p className="mb-6">{course.description}</p>
              
              <h3 className="text-lg font-medium mb-3">Learning Objectives</h3>
              <ul className="list-disc pl-5 space-y-2">
                {course.learning_objectives?.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            
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
          </div>
          
          <div className="lg:col-span-4">
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
            
            {course.prerequisite_course_ids && course.prerequisite_course_ids.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-2">Prerequisites</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We recommend completing these courses first:
                </p>
                <div className="space-y-2">
                  {/* Placeholder for prerequisite courses - in real implementation we'd fetch them */}
                  <p className="text-sm">This feature will be implemented soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDashboard;
