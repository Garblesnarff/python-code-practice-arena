
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Problem } from '@/data/problems/types';
import { Course, Topic } from '@/types/user';
import { getCourseById, getTopicById, getProblemById } from '@/services/courseService';

interface UseProblemDataProps {
  courseId?: string;
  topicId?: string;
  problemId?: string;
}

export const useProblemData = ({ courseId, topicId, problemId }: UseProblemDataProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
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
    
    const loadData = async () => {
      setLoading(true);
      try {
        if (!courseId || !topicId || !problemId) return;
        
        // Load course data
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
        
        // Load topic data
        const topicData = await getTopicById(topicId);
        if (!topicData) {
          toast({
            title: "Topic Not Found",
            description: "The requested topic could not be found.",
            variant: "destructive"
          });
          navigate(`/courses/${courseId}`);
          return;
        }
        setTopic(topicData);
        
        // Load problem data
        const problemData = await getProblemById(problemId);
        if (!problemData) {
          toast({
            title: "Problem Not Found",
            description: "The requested problem could not be found.",
            variant: "destructive"
          });
          navigate(`/courses/${courseId}/topics/${topicId}`);
          return;
        }
        setProblem(problemData);
      } catch (error) {
        console.error('Error loading problem data:', error);
        toast({
          title: "Error",
          description: "Failed to load problem data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [courseId, topicId, problemId, user, toast, navigate]);

  return {
    course,
    topic,
    problem,
    loading,
  };
};
