
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCompletedProblems, getUserAchievements } from '@/services/gamificationService';
import { supabase } from '@/integrations/supabase/client';
import { CompletedProblem, UserAchievement } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const useProfileData = () => {
  const { user, profile } = useAuth();
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          username: user.email,
          level: 1,
          xp: 0,
          xp_to_next_level: 100,
          streak_days: 0
        })
        .single();
        
      if (profileError) {
        console.error('Error creating profile:', profileError);
        setError('Unable to create user profile. Please try again later.');
        return false;
      }
      
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully.",
        duration: 3000,
      });
      
      // Refresh the page to load the new profile
      window.location.reload();
      return true;
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile. Please try again later.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadProfileData = async () => {
    if (!user || !profile) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Load completed problems
      const problems = await getCompletedProblems(user.id);
      setCompletedProblems(problems);
      
      // Load user achievements
      const userAchievements = await getUserAchievements(user.id);
      setAchievements(userAchievements);
      
    } catch (err) {
      console.error('Error loading profile data:', err);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user && profile) {
      loadProfileData();
    } else if (user) {
      setLoading(false); // Stop loading if user exists but no profile
    }
  }, [user, profile]);

  return {
    completedProblems,
    achievements,
    loading,
    error,
    createProfile
  };
};
