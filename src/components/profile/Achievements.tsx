
import React from 'react';
import { UserAchievement } from '@/types/user';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface AchievementsProps {
  achievements: UserAchievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription>
          You've unlocked {achievements.length} achievements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start space-x-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
              >
                <div className="bg-primary/20 p-2 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{item.achievement?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.achievement?.description}
                  </p>
                  <div className="text-xs mt-1 text-muted-foreground">
                    Unlocked: {new Date(item.unlocked_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            You haven't unlocked any achievements yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;
