
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressStatsCard from '@/components/analytics/ProgressStatsCard';
import ProgressTimeline from '@/components/analytics/ProgressTimeline';
import LearningPatternChart from '@/components/analytics/LearningPatternChart';
import SkillBreakdownChart from '@/components/analytics/SkillBreakdownChart';
import { useAuth } from '@/contexts/AuthContext';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <ProgressStatsCard 
            title="Total Problems" 
            value={125}
            change={+15}
            changeLabel="from last month" 
          />
          <ProgressStatsCard 
            title="Completed" 
            value={87} 
            change={+12}
            changeLabel="from last month"
          />
          <ProgressStatsCard 
            title="Success Rate" 
            value="69.6%" 
            change={+2.3}
            changeLabel="from last month"
            changeFormat="percent"
          />
          <ProgressStatsCard 
            title="XP Earned" 
            value={4250} 
            change={+550}
            changeLabel="from last month"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressTimeline />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Learning Patterns</CardTitle>
              <CardDescription>When you're most active</CardDescription>
            </CardHeader>
            <CardContent>
              <LearningPatternChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Areas of strength and improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillBreakdownChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
