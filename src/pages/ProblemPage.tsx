
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { getCourseById, getTopicById, getProblemById, updateCourseProgressAfterProblemCompletion } from '@/services/courseService';
import { Course, Topic } from '@/types/user';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import LoadingOverlay from '@/components/LoadingOverlay';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import { Problem } from '@/data/problems';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';
import ProblemSection from '@/components/problem-page/ProblemSection';
import CodeEditorSection from '@/components/problem-page/CodeEditorSection';
import TestResults from '@/components/TestResults';
import { usePyodide } from '@/hooks/usePyodide';
import { useNotifications } from '@/hooks/useNotifications';
import { useCompletedProblems } from '@/hooks/useCompletedProblems';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { completeProblem } from '@/services/gamificationService';
import { useProfileData } from '@/hooks/useProfileData';

const ProblemPage = () => {
  const { courseId, topicId, problemId } = useParams<{ 
    courseId: string; 
    topicId: string;
    problemId: string;
  }>();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshAllProfileData } = useProfileData();
  const { isPyodideLoading } = usePyodide();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  
  const {
    xpNotification,
    showXPNotification,
    handleNotificationClose
  } = useNotifications();
  
  const {
    completedProblems,
    refreshCompletedProblems,
    isProblemCompleted
  } = useCompletedProblems();
  
  // Initialize code execution with null problem
  const {
    code,
    testResults,
    isExecuting,
    handleCodeChange,
    executeCode,
    handleClearCode,
    resetCode
  } = useCodeExecution(problem || {} as Problem);
  
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
  
  // Reset code when problem changes
  useEffect(() => {
    if (problem) {
      resetCode();
    }
  }, [problem, resetCode]);
  
  const handleRunTests = async () => {
    if (!problem) return;
    
    const results = await executeCode(problem.test_cases);
    
    if (!results) return;
    
    // Check if all tests passed and award XP
    if (results.summary.passed === results.summary.total && user) {
      // Check if problem already completed
      const isAlreadyCompleted = isProblemCompleted(problem.id);
      
      if (!isAlreadyCompleted) {
        const prevLevel = profile?.level || 1;
        const { success, xpGained } = await completeProblem(
          user.id,
          problem.id,
          topic?.title || 'medium',
          courseId,
          topicId
        );
        
        if (success && xpGained > 0) {
          // Refresh profile data to update XP and level
          const updatedProfile = await refreshAllProfileData();
          
          // Show XP notification
          showXPNotification(`+${xpGained} XP gained!`);
          
          // Refresh completed problems
          await refreshCompletedProblems();
          
          // Update course progress if courseId provided
          if (courseId) {
            await updateCourseProgressAfterProblemCompletion(user.id, courseId, true);
          }
          
          // Check for level up
          if (updatedProfile && updatedProfile.level > prevLevel) {
            setTimeout(() => {
              showXPNotification(`Level up! You're now level ${updatedProfile.level}!`, 'level');
            }, 4000); // Show after the XP notification disappears
          }
        }
      }
      
      toast({
        title: 'Success!',
        description: `All ${results.summary.total} tests passed! 🎉`,
        variant: 'default'
      });
    } else {
      toast({
        title: 'Tests Completed',
        description: `Passed ${results.summary.passed} of ${results.summary.total} tests.`,
        variant: 'default'
      });
    }
  };
  
  if (loading || isPyodideLoading) {
    return <LoadingOverlay />;
  }
  
  if (!course || !topic || !problem) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Problem Not Found</h2>
            <p className="mb-4">The problem you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to={`/courses/${courseId}/topics/${topicId}`}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Topic
          </Link>
        </Button>
        
        <div className="mb-6">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: course.title, href: `/courses/${courseId}` },
              { label: topic.title, href: `/courses/${courseId}/topics/${topicId}` },
              { label: problem.title, href: `/courses/${courseId}/topics/${topicId}/problems/${problemId}` }
            ]}
          />
        </div>
        
        {/* XP Notification */}
        <XPNotificationManager 
          notification={xpNotification}
          onNotificationClose={handleNotificationClose}
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-14rem)]">
          <ProblemSection 
            problem={problem} 
            className="lg:col-span-2" 
          />
          
          <div className="flex flex-col gap-6 lg:col-span-3">
            <CodeEditorSection 
              code={code}
              onChange={handleCodeChange}
              onRun={handleRunTests}
              onClear={handleClearCode}
              isExecuting={isExecuting}
            />
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col h-1/2">
              <h2 className="text-lg font-semibold p-4 border-b">Results</h2>
              <div className="flex-1 overflow-hidden">
                <TestResults results={testResults} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProblemPage;
