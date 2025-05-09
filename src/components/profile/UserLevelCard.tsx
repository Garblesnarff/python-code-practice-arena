
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { UserProfile, UserBadge } from '@/types/user';
import { Badge } from '@/components/ui/badge';

interface UserLevelCardProps {
  profile: UserProfile;
  user: any;
  showcasedBadges?: UserBadge[];
}

const UserLevelCard: React.FC<UserLevelCardProps> = ({ profile, user, showcasedBadges = [] }) => {
  const totalXp = profile.xp;
  const xpToNextLevel = profile.xp_to_next_level;
  const currentLevelXp = totalXp - (xpToNextLevel ? totalXp - xpToNextLevel : 0);
  const nextLevelXp = currentLevelXp + xpToNextLevel;
  const progressPercentage = (currentLevelXp / nextLevelXp) * 100;

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex-shrink-0">
        <div className="h-20 w-20 md:h-24 md:w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl md:text-3xl">
          {profile.level}
        </div>
      </div>

      <div className="flex-grow space-y-2">
        <h2 className="font-bold text-xl md:text-2xl">{user?.email || profile.username}</h2>
        
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* Streak badge */}
          {profile.streak_days > 0 && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
              🔥 {profile.streak_days} day streak
            </Badge>
          )}
          
          {/* Showcased badges */}
          {showcasedBadges.map(badge => (
            <Badge 
              key={badge.id}
              variant="outline" 
              className="bg-primary/10 text-primary"
            >
              {badge.badge?.name}
            </Badge>
          ))}
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Level {profile.level}</span>
            <span className="font-medium">Level {profile.level + 1}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>
              {currentLevelXp} XP
            </span>
            <span>
              {nextLevelXp} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLevelCard;
