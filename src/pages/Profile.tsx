
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LoadingState from '@/components/profile/LoadingState';
import ErrorState from '@/components/profile/ErrorState';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import ProfileContent from '@/components/profile/ProfileContent';
import { useProfileData } from '@/hooks/useProfileData';
import Layout from '@/components/layout/Layout';

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { completedProblems, achievements, loading, error, createProfile } = useProfileData();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Redirect to auth page if no user
  if (!user) {
    return null; // Will be redirected by the useEffect
  }

  if (loading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorState error={error} />
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <ProfileNotFound onCreateProfile={createProfile} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileContent 
        profile={profile}
        user={user}
        completedProblems={completedProblems}
        achievements={achievements}
      />
    </Layout>
  );
};

export default Profile;
