
import React from 'react';
import { UserBadge } from '@/types/user';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield, Star, Zap } from 'lucide-react';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toggleShowcaseBadge } from '@/services/badgeService';
import { useToast } from '@/components/ui/use-toast';

interface BadgesDisplayProps {
  badges: UserBadge[];
  canToggleShowcase?: boolean;
  onBadgeUpdate?: () => void;
}

const BadgesDisplay: React.FC<BadgesDisplayProps> = ({ 
  badges,
  canToggleShowcase = false,
  onBadgeUpdate
}) => {
  const { toast } = useToast();
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Skill':
        return <Zap className="h-4 w-4 text-amber-500" />;
      case 'Rank':
        return <Star className="h-4 w-4 text-indigo-500" />;
      case 'Challenge':
        return <Shield className="h-4 w-4 text-emerald-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const handleToggleShowcase = async (userBadgeId: string, currentShowcase: boolean) => {
    const { success } = await toggleShowcaseBadge(userBadgeId, !currentShowcase);
    
    if (success) {
      toast({
        title: currentShowcase ? "Badge removed from showcase" : "Badge added to showcase",
        duration: 2000
      });
      
      if (onBadgeUpdate) {
        onBadgeUpdate();
      }
    } else {
      toast({
        title: "Error updating badge showcase",
        variant: "destructive",
        duration: 2000
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>
          You've earned {badges.length} badge{badges.length !== 1 ? 's' : ''}.
          {canToggleShowcase && " Select up to 3 badges to showcase on your profile."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                  {badge.badge?.icon ? (
                    <img 
                      src={badge.badge.icon} 
                      alt={badge.badge.name} 
                      className="w-12 h-12" 
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center">
                      {getCategoryIcon(badge.badge?.category || '')}
                    </div>
                  )}
                </div>
                
                <h4 className="font-medium text-center">{badge.badge?.name}</h4>
                
                <UIBadge 
                  variant="outline" 
                  className="my-1 bg-primary/5"
                >
                  {badge.badge?.category}
                </UIBadge>
                
                <p className="text-xs text-center text-muted-foreground mt-1 mb-2">
                  {badge.badge?.description}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  Earned: {new Date(badge.earned_at).toLocaleDateString()}
                </p>
                
                {canToggleShowcase && (
                  <Button
                    variant={badge.showcased ? "default" : "outline"}
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleToggleShowcase(badge.id, !!badge.showcased)}
                  >
                    {badge.showcased ? "Remove from Showcase" : "Add to Showcase"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <p>You haven't earned any badges yet.</p>
            <p className="text-sm">Complete more challenges to earn badges!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgesDisplay;
