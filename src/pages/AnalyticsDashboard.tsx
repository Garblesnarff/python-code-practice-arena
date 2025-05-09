
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressStatsCard from '@/components/analytics/ProgressStatsCard';
import LearningPatternChart from '@/components/analytics/LearningPatternChart';
import SkillBreakdownChart from '@/components/analytics/SkillBreakdownChart';
import ProgressTimeline from '@/components/analytics/ProgressTimeline';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfileData } from '@/hooks/useProfileData';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading: profileLoading } = useProfileData();
  const { analyticsData, isLoading, error } = useAnalyticsData();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your analytics dashboard.",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress Details</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-10 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <ProgressStatsCard 
                    title="Completed Problems"
                    value={analyticsData?.totalCompletedProblems || 0}
                    change={analyticsData?.weeklyCompletionChange || 0}
                    description="Total problems completed"
                  />
                  <ProgressStatsCard 
                    title="Course Progress"
                    value={analyticsData?.averageCourseCompletion || 0}
                    suffix="%"
                    change={analyticsData?.courseCompletionChange || 0}
                    description="Average completion across courses"
                  />
                  <ProgressStatsCard 
                    title="XP Earned"
                    value={analyticsData?.totalXP || 0}
                    change={analyticsData?.weeklyXPChange || 0}
                    description="Total experience points"
                  />
                  <ProgressStatsCard 
                    title="Current Streak"
                    value={analyticsData?.currentStreak || 0}
                    suffix=" days"
                    change={0}
                    description="Consecutive days active"
                  />
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Over Time</CardTitle>
                  <CardDescription>Problem completion trend</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {isLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <ProgressTimeline data={analyticsData?.progressTimeline || []} />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                  <CardDescription>Progress across different courses</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {isLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <SkillBreakdownChart data={analyticsData?.skillDistribution || []} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Progress Timeline</CardTitle>
                <CardDescription>Track your learning journey over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ProgressTimeline 
                    data={analyticsData?.progressTimeline || []}
                    detailed
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skill Level Breakdown</CardTitle>
                <CardDescription>Detailed analysis of your skills by topic and course</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <SkillBreakdownChart 
                    data={analyticsData?.skillDistribution || []}
                    detailed
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Pattern Analysis</CardTitle>
                <CardDescription>Insights into your learning habits and patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <LearningPatternChart 
                    data={analyticsData?.learningPatterns || []}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
