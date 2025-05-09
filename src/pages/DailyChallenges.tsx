
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import DailyChallengeCard from '@/components/challenges/DailyChallengeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getTodaysChallenge, hasCompletedTodaysChallenge, getUserChallengeStreak, getUserChallengeHistory } from '@/services/dailyChallengeService';
import { DailyChallenge, UserDailyChallenge } from '@/types/user';

const DailyChallenges = () => {
  const { user, profile } = useAuth();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<UserDailyChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadDailyChallenge();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadDailyChallenge = async () => {
    setIsLoading(true);
    try {
      if (!user?.id) return;
      
      const todaysChallenge = await getTodaysChallenge();
      setChallenge(todaysChallenge);
      
      if (todaysChallenge) {
        const completed = await hasCompletedTodaysChallenge(user.id);
        setIsCompleted(completed);
      }
      
      const userStreak = await getUserChallengeStreak(user.id);
      setStreak(userStreak);
      
      const challengeHistory = await getUserChallengeHistory(user.id);
      setHistory(challengeHistory);
    } catch (error) {
      console.error('Error loading daily challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Daily Challenges</h1>
            <p className="text-muted-foreground mt-1">
              Complete daily challenges to earn bonus XP and maintain your streak
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DailyChallengeCard
              challenge={challenge}
              isCompleted={isCompleted}
              streak={streak}
              onStartChallenge={loadDailyChallenge}
            />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="history">
                  <TabsList className="mb-4">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history">
                    {history.length > 0 ? (
                      <div className="space-y-4">
                        {history.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex justify-between items-center border-b pb-2 last:border-0"
                          >
                            <div>
                              <p className="font-medium">
                                {item.challenge?.difficulty} Challenge
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(item.completed_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-sm">
                              {item.time_taken_seconds ? (
                                <span>
                                  Completed in {Math.floor(item.time_taken_seconds / 60)}:{(item.time_taken_seconds % 60).toString().padStart(2, '0')}
                                </span>
                              ) : (
                                <span>Completed</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p>No challenge history available.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete today's challenge to start your streak!
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="calendar">
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p>Challenge calendar view coming soon!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyChallenges;
