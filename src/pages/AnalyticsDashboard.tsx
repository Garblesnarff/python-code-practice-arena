
import React from 'react';
import Layout from '@/components/layout/Layout';
import { ProgressStatsCard } from '@/components/analytics/ProgressStatsCard';
import { ProgressTimeline } from '@/components/analytics/ProgressTimeline';
import { LearningPatternChart } from '@/components/analytics/LearningPatternChart';
import { SkillBreakdownChart } from '@/components/analytics/SkillBreakdownChart';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container max-w-7xl py-10 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-7xl py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learning Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress and improve your learning efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ProgressStatsCard
            title="Problems Solved"
            value={42}
            change={8}
            changeLabel="vs. last week"
            trend="up"
          />
          <ProgressStatsCard
            title="XP Earned"
            value={1250}
            change={320}
            changeLabel="vs. last week"
            trend="up"
          />
          <ProgressStatsCard
            title="Completion Rate"
            value={87}
            suffix="%"
            change={3}
            changeLabel="vs. last week"
            trend="up"
          />
          <ProgressStatsCard
            title="Avg. Solution Time"
            value={12.5}
            suffix="min"
            change={2.3}
            changeLabel="vs. last week"
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Progress Timeline</h3>
            <ProgressTimeline />
          </div>
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Learning Patterns</h3>
            <LearningPatternChart />
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Skill Breakdown</h3>
          <SkillBreakdownChart />
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
