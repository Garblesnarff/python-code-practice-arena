
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/user';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>; // Changed return type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to load user profile
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      // Transform data to match UserProfile interface
      const userProfile: UserProfile = {
        id: data.id,
        user_id: data.id, // Using id as user_id
        display_name: data.username || '', // Use username as display_name
        username: data.username || '',
        avatar_url: '', // Since it doesn't exist in the database, default to empty string
        xp: data.xp,
        level: data.level,
        xp_to_next_level: data.xp_to_next_level,
        streak_days: data.streak_days,
        last_active_date: data.last_active_date,
        daily_challenge_streak: data.daily_challenge_streak,
        best_challenge_streak: data.best_challenge_streak,
        last_daily_challenge_date: data.last_daily_challenge_date,
        total_paths_completed: data.total_paths_completed,
        total_badges_earned: data.total_badges_earned,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setProfile(userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  };

  // Function to refresh the user profile
  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null;
    
    try {
      const refreshedProfile = await loadUserProfile(user.id);
      return refreshedProfile;
    } catch (error) {
      console.error('Error refreshing profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        // When auth state changes, load user profile
        if (currentSession?.user) {
          loadUserProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      
      if (currentSession?.user) {
        loadUserProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
