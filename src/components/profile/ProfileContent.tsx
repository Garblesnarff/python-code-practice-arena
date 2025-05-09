
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompletedProblem, UserAchievement, UserProfile } from '@/types/user';
import UserLevelCard from './UserLevelCard';
import CompletedProblems from './CompletedProblems';
import Achievements from './Achievements';
import StatsSummary from './StatsSummary';

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
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User level card */}
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-6">
              <UserLevelCard profile={profile} user={user} />
            </div>
          </div>
        </div>
        
        {/* Main content tabs */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="progress">
            <TabsList className="mb-4">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress">
              <div className="space-y-6">
                <CompletedProblems completedProblems={completedProblems} />
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Achievements achievements={achievements} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Stats sidebar */}
        <div className="col-span-1">
          <StatsSummary 
            profile={profile} 
            completedProblemsCount={completedProblems.length} 
            achievementsCount={achievements.length} 
          />
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
