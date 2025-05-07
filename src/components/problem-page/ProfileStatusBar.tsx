
import React from 'react';
import { UserProfile } from '@/types/user';

interface ProfileStatusBarProps {
  profile: UserProfile | null;
  completedCount: number;
  totalProblems: number;
}

const ProfileStatusBar: React.FC<ProfileStatusBarProps> = ({ 
  profile, 
  completedCount, 
  totalProblems 
}) => {
  if (!profile) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4 flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-sm font-medium">Level {profile.level}</div>
          <div className="text-xs text-gray-500">{profile.xp} XP • {profile.xp_to_next_level} XP to next level</div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
          {completedCount} / {totalProblems} completed
        </div>
      </div>
    </div>
  );
};

export default ProfileStatusBar;
