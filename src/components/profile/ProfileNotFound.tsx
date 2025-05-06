
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileNotFoundProps {
  onCreateProfile: () => void;
}

const ProfileNotFound: React.FC<ProfileNotFoundProps> = ({ onCreateProfile }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We couldn't find your profile. Let's create one for you.
        </p>
        <Button onClick={onCreateProfile}>
          Create Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileNotFound;
