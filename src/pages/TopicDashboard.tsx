import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { getCourseById, getTopicById, getProblemsByTopicId } from '@/services/courseService';
import { getCompletedProblems } from '@/services/gamificationService';
import { Course, Topic } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import LoadingOverlay from '@/components/LoadingOverlay';
import BreadcrumbNav from '@/components/problem-page/BreadcrumbNav';
import { Problem } from '@/data/problems/types';

const TopicDashboard = () => {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);
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
        if (user) {
          const userCompletedProblems = await getCompletedProblems(user.id);
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
  }, [courseId, topicId, user, toast, navigate]);
  
  if (loading) {
    return <LoadingOverlay />;
  }
  
  if (!course || !topic) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
            <p className="mb-4">The topic you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const problemsCompleted = problems.filter(problem => 
    completedProblemIds.includes(problem.id)
  ).length;
  
  const progressPercentage = problems.length > 0
    ? (problemsCompleted / problems.length) * 100
    : 0;

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
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Problems</h2>
              
              {problems.length === 0 ? (
                <p>No problems available for this topic yet.</p>
              ) : (
                <div className="space-y-4">
                  {problems.map((problem) => (
                    <Card key={problem.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{problem.title}</CardTitle>
                          {completedProblemIds.includes(problem.id) && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <CardDescription>
                          Difficulty: {problem.difficulty}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {problem.description.substring(0, 100)}...
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/courses/${courseId}/topics/${topicId}/problems/${problem.id}`}>
                            {completedProblemIds.includes(problem.id) ? 'Review Problem' : 'Start Problem'}
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>{problemsCompleted} completed</span>
                  <span>{problems.length} total</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    {problemsCompleted} / {problems.length} problems completed
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    {progressPercentage === 100 ? 'Topic completed' : 'Topic in progress'}
                  </span>
                </div>
              </div>
              
              {problems.length > 0 && (
                <Button className="w-full mt-6" asChild>
                  <Link to={`/courses/${courseId}/topics/${topicId}/problems/${problems[0].id}`}>
                    {problemsCompleted > 0 ? 'Continue Learning' : 'Start Topic'}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TopicDashboard;
