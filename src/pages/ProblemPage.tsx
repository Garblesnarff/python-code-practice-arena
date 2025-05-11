
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/LoadingOverlay';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import ProblemContainer from '@/components/problem-page/ProblemContainer';
import ProblemNotFound from '@/components/problem-page/ProblemNotFound';
import XPNotificationManager from '@/components/notifications/XPNotificationManager';
import { usePyodide } from '@/hooks/usePyodide';
import { useProblemData } from '@/hooks/useProblemData';
import { useProblemExecution } from '@/hooks/useProblemExecution';
import { Problem } from '@/data/problems/types';

const ProblemPage = () => {
  const { courseId, topicId, problemId } = useParams<{ 
    courseId: string; 
    topicId: string;
    problemId: string;
  }>();
  
  const { isPyodideLoading } = usePyodide();
  
  // Load problem data
  const { course, topic, problem, loading } = useProblemData({ 
    courseId, 
    topicId, 
    problemId 
  });
  
  // Handle code execution and XP
  const {
    code,
    testResults,
    isExecuting,
    xpNotification,
    levelUpNotification,
    isProblemCompleted,
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose,
    handleLevelUpNotificationClose
  } = useProblemExecution({ 
    problem: problem as Problem, 
    difficulty: topic?.title || 'medium',
    courseId,
    topicId
  });
  
  // Reset code when problem changes
  useEffect(() => {
    // No additional logic needed here as useProblemExecution handles this
  }, [problem]);
  
  if (loading || isPyodideLoading) {
    return <LoadingOverlay />;
  }
  
  if (!course || !topic || !problem) {
    return <ProblemNotFound />;
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
          levelUpNotification={levelUpNotification}
          onNotificationClose={handleNotificationClose}
          onLevelUpNotificationClose={handleLevelUpNotificationClose}
        />
        
        <ProblemContainer 
          problem={problem}
          code={code}
          testResults={testResults}
          isExecuting={isExecuting}
          onCodeChange={handleCodeChange}
          onRunTests={handleRunTests}
          onClearCode={handleClearCode}
          isCompleted={isProblemCompleted(problem.id)}
        />
      </div>
    </Layout>
  );
};

export default ProblemPage;
