
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface ProfileHeaderProps {
  onSignOut: () => Promise<void>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onSignOut }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
          <Button variant="outline" size="sm" onClick={onSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
