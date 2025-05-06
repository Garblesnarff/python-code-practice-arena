
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LoadingState from '@/components/profile/LoadingState';
import ErrorState from '@/components/profile/ErrorState';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import ProfileContent from '@/components/profile/ProfileContent';
import { useProfileData } from '@/hooks/useProfileData';

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { completedProblems, achievements, loading, error, createProfile } = useProfileData();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!profile) {
    return <ProfileNotFound onCreateProfile={createProfile} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProfileHeader onSignOut={handleSignOut} />
      <ProfileContent 
        profile={profile}
        user={user}
        completedProblems={completedProblems}
        achievements={achievements}
      />
    </div>
  );
};

export default Profile;
