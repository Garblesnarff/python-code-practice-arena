
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import LearningHub from '@/components/home/LearningHub';
import LearningPathVisualizer from '@/components/home/LearningPathVisualizer';
import { getCourses, getAllCourseProgress } from '@/services/courseService';
import { getCompletedProblems } from '@/services/gamificationService';
import { getUserAchievements } from '@/services/gamificationService';
import { Course, CourseProgress } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LearningHubPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [completedProblems, setCompletedProblems] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  // Get a unique list of problems from all completed problems
  const uniqueProblems = completedProblems.reduce((acc, problem) => {
    if (!acc.some(p => p.problem_id === problem.problem_id)) {
      acc.push(problem);
    }
    return acc;
  }, [] as any[]);
  
  // Filter problems by search query and difficulty
  const filteredProblems = uniqueProblems.filter(problem => {
    const matchesSearch = !searchQuery || 
      problem.problem_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || 
      problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        
        if (user) {
          const progressData = await getAllCourseProgress(user.id);
          setCourseProgress(progressData);
          
          const problemsData = await getCompletedProblems(user.id);
          setCompletedProblems(problemsData);
          
          const achievementsData = await getUserAchievements(user.id);
          setAchievements(achievementsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LearningHub 
          courses={courses}
          progress={courseProgress}
          totalCompletedProblems={uniqueProblems.length}
          totalAchievements={achievements.length}
          className="mb-12"
        />
        
        <div className="mb-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <LearningPathVisualizer 
            courses={courses} 
            progress={courseProgress}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="all">All Problems</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-64"
              />
              <Select 
                value={difficultyFilter} 
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="md:w-36">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <Card>
                <CardHeader>
                  <CardTitle>Loading problems...</CardTitle>
                </CardHeader>
              </Card>
            ) : filteredProblems.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No problems found</CardTitle>
                  <CardDescription>Try adjusting your search filters.</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              filteredProblems.map((problem) => (
                <Card key={problem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{problem.problem_id}</CardTitle>
                      <div className={`text-xs rounded-full px-2 py-1 ${
                        problem.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </div>
                    </div>
                    <CardDescription>
                      Completed on {new Date(problem.completed_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Earned {problem.xp_earned} XP
                      </p>
                    </div>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/courses/${problem.course_id}/topics/${problem.topic_id}/problems/${problem.problem_id}`)}
                    >
                      View Problem
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {/* Similar to "all" but only showing completed problems */}
            {loading ? (
              <Card>
                <CardHeader>
                  <CardTitle>Loading completed problems...</CardTitle>
                </CardHeader>
              </Card>
            ) : filteredProblems.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No completed problems yet</CardTitle>
                  <CardDescription>Start solving problems to see them here!</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              filteredProblems.map((problem) => (
                <Card key={problem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{problem.problem_id}</CardTitle>
                      <div className={`text-xs rounded-full px-2 py-1 ${
                        problem.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </div>
                    </div>
                    <CardDescription>
                      Completed on {new Date(problem.completed_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Earned {problem.xp_earned} XP
                      </p>
                    </div>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/courses/${problem.course_id}/topics/${problem.topic_id}/problems/${problem.problem_id}`)}
                    >
                      View Problem
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="recommended" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Problems</CardTitle>
                <CardDescription>
                  Based on your current progress and skills
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* In a real implementation, this would show personalized recommended problems */}
                <p className="text-gray-600 dark:text-gray-400">
                  Recommendations are being calculated based on your learning habits and progress.
                  Check back soon for personalized problem suggestions.
                </p>
                <div className="mt-4">
                  <Button onClick={() => navigate('/')}>
                    Continue Learning Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LearningHubPage;
