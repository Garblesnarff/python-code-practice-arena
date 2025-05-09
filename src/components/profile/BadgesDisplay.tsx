
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle } from 'lucide-react';
import { UserBadge } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
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
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  
  const toggleShowcase = async (badgeId: string, currentShowcaseStatus: boolean | null) => {
    if (!canToggleShowcase) return;
    
    setUpdating(badgeId);
    try {
      const { error } = await supabase
        .from('user_badges')
        .update({ showcased: !currentShowcaseStatus })
        .eq('id', badgeId);
      
      if (error) throw error;
      
      toast({
        title: currentShowcaseStatus 
          ? "Badge removed from showcase" 
          : "Badge added to showcase",
        description: "Your profile has been updated.",
        duration: 3000,
      });
      
      if (onBadgeUpdate) {
        onBadgeUpdate();
      }
    } catch (error) {
      console.error('Error updating badge showcase status:', error);
      toast({
        title: "Update Failed",
        description: "Could not update badge showcase status.",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (badges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Award className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Badges Yet</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Complete challenges, solve problems, and maintain your streak to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <Card key={badge.id} className={badge.showcased ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{badge.badge?.name || "Unknown Badge"}</CardTitle>
                <CardDescription className="text-xs">
                  Earned {new Date(badge.earned_at).toLocaleDateString()}
                </CardDescription>
              </div>
              {badge.showcased && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <CheckCircle className="h-3 w-3 mr-1" /> Showcased
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{badge.badge?.description}</p>
            {canToggleShowcase && (
              <Button
                variant={badge.showcased ? "outline" : "default"}
                size="sm"
                className="w-full"
                disabled={!!updating}
                onClick={() => toggleShowcase(badge.id, badge.showcased)}
              >
                {updating === badge.id 
                  ? "Updating..." 
                  : badge.showcased 
                    ? "Remove from Showcase" 
                    : "Add to Showcase"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BadgesDisplay;
