
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCompletedProblems, getUserAchievements } from '@/services/gamificationService';
import { supabase } from '@/integrations/supabase/client';
import { CompletedProblem, UserAchievement } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useProfileData = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch completed problems using React Query
  const { 
    data: completedProblems = [],
    isLoading: isLoadingProblems,
    refetch: refetchProblems
  } = useQuery({
    queryKey: ['completedProblems', user?.id],
    queryFn: () => getCompletedProblems(user?.id as string),
    enabled: !!user && !!profile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch user achievements using React Query
  const { 
    data: achievements = [],
    isLoading: isLoadingAchievements,
    refetch: refetchAchievements
  } = useQuery({
    queryKey: ['achievements', user?.id],
    queryFn: () => getUserAchievements(user?.id as string),
    enabled: !!user && !!profile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating user profile
  const { mutate: createProfileMutation, isPending: isCreatingProfile } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('No user found');
      
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
        throw new Error(`Unable to create user profile: ${profileError.message}`);
      }
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully.",
        duration: 3000,
      });
      
      // Refresh auth context profile data instead of reloading the page
      refreshProfile().then(() => {
        // After profile refresh, invalidate related queries
        queryClient.invalidateQueries({ queryKey: ['completedProblems'] });
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
      });
    },
    onError: (error) => {
      console.error('Error creating profile:', error);
      setError('Failed to create profile. Please try again later.');
      
      toast({
        title: "Profile Creation Failed",
        description: error.message || 'An error occurred creating your profile',
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  const createProfile = () => {
    createProfileMutation();
  };

  // Function to refresh all profile related data
  const refreshAllProfileData = async () => {
    await refreshProfile();
    await refetchProblems();
    await refetchAchievements();
  };

  // Combine loading states
  const loading = isLoadingProblems || isLoadingAchievements || isCreatingProfile;

  return {
    completedProblems,
    achievements,
    loading,
    error,
    createProfile,
    refreshAllProfileData
  };
};
