
import React from 'react';
import NavigationBar from './NavigationBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Python Learning Arena. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
