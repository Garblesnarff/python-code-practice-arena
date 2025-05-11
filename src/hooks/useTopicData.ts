
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { getCourseById, getTopicById, getProblemsByTopicId } from '@/services/courseService';
import { getCompletedProblems } from '@/services/gamificationService';
import { Course, Topic } from '@/services/course-types';
import { Problem } from '@/data/problems/types';

export const useTopicData = (courseId: string | undefined, topicId: string | undefined, userId: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (!courseId || !topicId) return;
        
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
        
        // Load problems for this topic
        const problemsData = await getProblemsByTopicId(topicId);
        setProblems(problemsData);
        
        // Get completed problems for the user
        if (userId) {
          const userCompletedProblems = await getCompletedProblems(userId);
          setCompletedProblemIds(userCompletedProblems.map(p => p.problem_id));
        }
      } catch (error) {
        console.error('Error loading topic data:', error);
        toast({
          title: "Error",
          description: "Failed to load topic data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [courseId, topicId, userId, toast, navigate]);
  
  // Calculate progress
  const problemsCompleted = problems.filter(problem => 
    completedProblemIds.includes(problem.id)
  ).length;
  
  const progressPercentage = problems.length > 0
    ? (problemsCompleted / problems.length) * 100
    : 0;
    
  const firstProblemId = problems.length > 0 ? problems[0].id : undefined;

  return {
    course,
    topic,
    problems,
    completedProblemIds,
    loading,
    problemsCompleted,
    totalProblems: problems.length,
    progressPercentage,
    firstProblemId
  };
};
