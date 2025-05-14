
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import LoadingOverlay from '@/components/LoadingOverlay';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import TopicContentSection from '@/components/topic/TopicContentSection';
import TopicProgressSidebar from '@/components/topic/TopicProgressSidebar';
import TopicNotFound from '@/components/topic/TopicNotFound';
import { useTopicData } from '@/hooks/useTopicData';

const TopicDashboard = () => {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated; wait for authLoading to be false first
  React.useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access course content.",
        variant: "default"
      });
      navigate('/auth');
    }
  }, [authLoading, user, toast, navigate]);

  // Load topic data (pass user ID only after authLoading is done)
  const {
    course,
    topic,
    problems,
    completedProblemIds,
    loading,
    problemsCompleted,
    totalProblems,
    progressPercentage,
    firstProblemId
  } = useTopicData(
    courseId,
    topicId,
    (!authLoading && user) ? user.id : undefined
  );

  if (authLoading || loading) {
    return <LoadingOverlay />;
  }

  if (!course || !topic) {
    return <TopicNotFound />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to={`/courses/${courseId}`}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
        
        <div className="mb-6">
          <BreadcrumbNav 
            items={[
              { label: 'Home', href: '/' },
              { label: course.title, href: `/courses/${courseId}` },
              { label: topic.title, href: `/courses/${courseId}/topics/${topicId}` }
            ]}
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{topic.description}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <TopicContentSection 
            problems={problems}
            courseId={courseId || ''}
            topicId={topicId || ''}
            completedProblemIds={completedProblemIds}
          />
          
          <TopicProgressSidebar 
            problemsCompleted={problemsCompleted}
            totalProblems={totalProblems}
            progressPercentage={progressPercentage}
            courseId={courseId || ''}
            topicId={topicId || ''}
            firstProblemId={firstProblemId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TopicDashboard;
