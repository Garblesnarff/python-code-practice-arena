
import React from 'react';
import { UserProfile } from '@/types/user';
import { Progress } from '@/components/ui/progress';

interface UserLevelCardProps {
  profile: UserProfile;
  user: any;
}

const UserLevelCard: React.FC<UserLevelCardProps> = ({ profile, user }) => {
  return (
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
  );
};

export default UserLevelCard;
