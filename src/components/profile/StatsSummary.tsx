
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Flame, 
  GraduationCap, 
  Shield, 
  Zap 
} from 'lucide-react';
import { UserProfile } from '@/types/user';
import ProgressStatsCard from '../analytics/ProgressStatsCard';

interface StatsSummaryProps {
  profile: UserProfile;
  completedProblemsCount: number;
  achievementsCount: number;
  badgesCount?: number;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ 
  profile, 
  completedProblemsCount, 
  achievementsCount,
  badgesCount = 0
}) => {
  return (
    <div className="space-y-6">
      <ProgressStatsCard
        title="Current XP"
        value={profile.xp}
        change={5}
        description="Your total experience points"
        prefix=""
        suffix=" XP"
      />
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">Problems Solved</span>
              </div>
              <span className="font-medium">{completedProblemsCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">Achievements</span>
              </div>
              <span className="font-medium">{achievementsCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">Badges Earned</span>
              </div>
              <span className="font-medium">{badgesCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">Current Level</span>
              </div>
              <span className="font-medium">{profile.level}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">Current Streak</span>
              </div>
              <span className="font-medium">{profile.streak_days} days</span>
            </div>
            
            {profile.daily_challenge_streak !== undefined && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Challenge Streak</span>
                </div>
                <span className="font-medium">{profile.daily_challenge_streak} days</span>
              </div>
            )}
            
            {profile.best_challenge_streak !== undefined && profile.best_challenge_streak > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Best Streak</span>
                </div>
                <span className="font-medium">{profile.best_challenge_streak} days</span>
              </div>
            )}
            
            {profile.total_paths_completed !== undefined && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Paths Completed</span>
                </div>
                <span className="font-medium">{profile.total_paths_completed}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;
