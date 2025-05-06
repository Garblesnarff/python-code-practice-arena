
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCompletedProblems, getUserAchievements } from '@/services/gamificationService';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, CheckCircle, Zap, Calendar, LogOut, AlertCircle } from 'lucide-react';
import { CompletedProblem, UserAchievement } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if profile exists
        if (!profile) {
          // Try to create a profile if it doesn't exist
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: user.id,
              username: user.email,
              level: 1,
              xp: 0,
              xp_to_next_level: 100,
              streak_days: 0
            })
            .single();
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
            setError('Unable to create user profile. Please try again later.');
            setLoading(false);
            return;
          }
          
          toast({
            title: "Profile Created",
            description: "Your profile has been created successfully.",
            duration: 3000,
          });
          
          // Refresh the page to load the new profile
          window.location.reload();
          return;
        }
        
        // Load completed problems
        const problems = await getCompletedProblems(user.id);
        setCompletedProblems(problems);
        
        // Load user achievements
        const userAchievements = await getUserAchievements(user.id);
        setAchievements(userAchievements);
        
      } catch (err) {
        console.error('Error loading profile data:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [user, navigate, profile, toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Button variant="outline" className="ml-2" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We couldn't find your profile. Let's create one for you.
          </p>
          <Button onClick={() => window.location.reload()}>
            Create Profile
          </Button>
        </div>
      </div>
    );
  }

  // Group completed problems by difficulty
  const problemsByDifficulty = completedProblems.reduce((acc, problem) => {
    const difficulty = problem.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(problem);
    return acc;
  }, {} as Record<string, CompletedProblem[]>);

  // Calculate total XP earned from problems
  const totalProblemXP = completedProblems.reduce((sum, problem) => sum + problem.xp_earned, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User level card */}
          <Card className="col-span-1 md:col-span-3">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{profile.level}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-1">{profile.username || user.email}</h2>
                  <div className="text-sm text-muted-foreground mb-2">
                    Level {profile.level} • {profile.xp} XP Total
                  </div>
                  
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>XP: {profile.xp}</span>
                      <span>Next Level: {profile.xp + profile.xp_to_next_level}</span>
                    </div>
                    <Progress 
                      value={(profile.xp_to_next_level > 0 ? 
                        ((profile.xp_to_next_level - profile.xp_to_next_level) / profile.xp_to_next_level) * 100 : 0)} 
                      className="h-2" 
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 bg-primary/10 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">{profile.streak_days}</div>
                  <div className="text-xs font-medium">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content tabs */}
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Problems</CardTitle>
                      <CardDescription>
                        You've completed {completedProblems.length} problems and earned {totalProblemXP} XP.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(problemsByDifficulty).map(([difficulty, problems]) => (
                          <div key={difficulty}>
                            <h3 className="font-medium capitalize mb-2 flex items-center">
                              {difficulty === 'fundamentals' && <BookOpen className="h-4 w-4 mr-1" />}
                              {difficulty === 'easy' && <CheckCircle className="h-4 w-4 mr-1" />}
                              {difficulty === 'medium' && <Zap className="h-4 w-4 mr-1" />}
                              {difficulty}
                            </h3>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
                                {problems.map((problem) => (
                                  <div 
                                    key={problem.id} 
                                    className="text-sm bg-white dark:bg-gray-700 p-2 rounded border"
                                  >
                                    {problem.problem_id} (+{problem.xp_earned} XP)
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {Object.keys(problemsByDifficulty).length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            You haven't completed any problems yet.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      You've unlocked {achievements.length} achievements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {achievements.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {achievements.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-start space-x-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
                          >
                            <div className="bg-primary/20 p-2 rounded-full">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.achievement?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.achievement?.description}
                              </p>
                              <div className="text-xs mt-1 text-muted-foreground">
                                Unlocked: {new Date(item.unlocked_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        You haven't unlocked any achievements yet.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Stats sidebar */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Stats Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Total XP</div>
                    <div className="text-2xl font-bold">{profile.xp}</div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Problems Solved</div>
                    <div className="text-2xl font-bold">{completedProblems.length}</div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Achievements</div>
                    <div className="text-2xl font-bold">{achievements.length}</div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md flex items-center">
                    <div className="mr-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                      <div className="text-lg font-bold">{profile.streak_days} days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
