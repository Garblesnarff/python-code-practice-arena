
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getCourseById, getTopicsByCourseId, getCourseProgress, markCourseAsAccessed } from '@/services/courseService';
import { Course, Topic, CourseProgress } from '@/types/user';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import LoadingOverlay from '@/components/LoadingOverlay';
import Layout from '@/components/layout/Layout';
import CourseOverview from '@/components/courses/CourseOverview';
import CourseTopics from '@/components/courses/CourseTopics';
import CourseProgressWidget from '@/components/courses/CourseProgress';
import PrerequisitesCourses from '@/components/courses/PrerequisitesCourses';
import CourseNotFound from '@/components/courses/CourseNotFound';

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
          await markCourseAsAccessed(user.id, courseId);
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
    return <CourseNotFound />;
  }

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
            <CourseOverview course={course} />
            <CourseTopics courseId={courseId || ''} topics={topics} />
          </div>
          
          <div className="lg:col-span-4">
            <CourseProgressWidget 
              courseId={courseId || ''} 
              progress={progress} 
              topics={topics}
            />
            <PrerequisitesCourses course={course} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDashboard;
