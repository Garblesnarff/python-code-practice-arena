
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompletedProblem, UserAchievement, UserProfile, UserBadge } from '@/types/user';
import UserLevelCard from './UserLevelCard';
import CompletedProblems from './CompletedProblems';
import Achievements from './Achievements';
import StatsSummary from './StatsSummary';
import BadgesDisplay from './BadgesDisplay';
import { getUserBadges } from '@/services/badgeService';

interface ProfileContentProps {
  profile: UserProfile;
  user: any;
  completedProblems: CompletedProblem[];
  achievements: UserAchievement[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  user,
  completedProblems,
  achievements
}) => {
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [showcasedBadges, setShowcasedBadges] = useState<UserBadge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user?.id) {
      loadBadges();
    }
  }, [user?.id]);
  
  const loadBadges = async () => {
    setIsLoading(true);
    try {
      const userBadges = await getUserBadges(user.id);
      setBadges(userBadges);
      
      const showcased = userBadges.filter(badge => badge.showcased);
      setShowcasedBadges(showcased);
    } catch (error) {
      console.error("Error loading badges:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBadgeUpdate = () => {
    loadBadges();
  };
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User level card */}
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-6">
              <UserLevelCard profile={profile} user={user} showcasedBadges={showcasedBadges} />
            </div>
          </div>
        </div>
        
        {/* Main content tabs */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="progress">
            <TabsList className="mb-4">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress">
              <div className="space-y-6">
                <CompletedProblems completedProblems={completedProblems} />
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Achievements achievements={achievements} />
            </TabsContent>
            
            <TabsContent value="badges">
              <BadgesDisplay 
                badges={badges} 
                canToggleShowcase={true}
                onBadgeUpdate={handleBadgeUpdate}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Stats sidebar */}
        <div className="col-span-1">
          <StatsSummary 
            profile={profile} 
            completedProblemsCount={completedProblems.length} 
            achievementsCount={achievements.length}
            badgesCount={badges.length}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
