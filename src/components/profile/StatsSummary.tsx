
import React from 'react';
import { UserProfile } from '@/types/user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface StatsSummaryProps {
  profile: UserProfile;
  completedProblemsCount: number;
  achievementsCount: number;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ 
  profile, 
  completedProblemsCount, 
  achievementsCount 
}) => {
  return (
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
            <div className="text-2xl font-bold">{completedProblemsCount}</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Achievements</div>
            <div className="text-2xl font-bold">{achievementsCount}</div>
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
  );
};

export default StatsSummary;
