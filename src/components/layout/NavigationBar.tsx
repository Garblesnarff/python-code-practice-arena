
// This file is read-only, we need to create an enhanced version
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Command } from 'lucide-react';
import { useSearch } from '@/components/search/SearchProvider';

// Add Analytics link to the navigation bar
const NavigationBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { openSearch } = useSearch();

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-xl flex items-center">
            Python Learning Arena
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/fundamentals" className="text-sm font-medium hover:opacity-80 transition-opacity">
              Fundamentals
            </Link>
            <Link to="/easy" className="text-sm font-medium hover:opacity-80 transition-opacity">
              Easy
            </Link>
            <Link to="/medium" className="text-sm font-medium hover:opacity-80 transition-opacity">
              Medium
            </Link>
            <Link to="/hard" className="text-sm font-medium hover:opacity-80 transition-opacity">
              Hard
            </Link>
          </nav>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <Button variant="outline" className="flex items-center" onClick={openSearch}>
            <Command className="h-4 w-4 mr-2" />
            <span>Search</span>
          </Button>
          
          {user ? (
            <>
              <Link to="/analytics" className="text-sm font-medium hover:opacity-80 transition-opacity">
                Analytics
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:opacity-80 transition-opacity">
                Profile
              </Link>
              <Link to="/settings" className="text-sm font-medium hover:opacity-80 transition-opacity">
                Settings
              </Link>
              <Button variant="ghost" onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
