
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useAuth } from '@/contexts/AuthContext';

interface FundamentalsLayoutProps {
  children: React.ReactNode;
  currentProblemIndex: number;
}

const FundamentalsLayout: React.FC<FundamentalsLayoutProps> = ({ 
  children,
  currentProblemIndex
}) => {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Python Fundamentals</h1>
              {profile && (
                <div className="hidden md:flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Level {profile.level} • {profile.xp} XP
                  </span>
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ 
                        width: `${100 - (profile.xp_to_next_level / (profile.xp_to_next_level + (profile.xp - (profile.level === 1 ? 0 : profile.level === 2 ? 100 : profile.level === 3 ? 250 : profile.level === 4 ? 500 : profile.level === 5 ? 1000 : profile.level === 6 ? 2000 : profile.level === 7 ? 3500 : profile.level === 8 ? 6000 : profile.level === 9 ? 10000 : 15000 + (profile.level - 10) * 10000)))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/fundamentals">Python Fundamentals</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  Problem {currentProblemIndex + 1}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {children}
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-gray-500">
          Python Learning Arena - Practice your coding skills for technical interviews
        </div>
      </footer>
    </div>
  );
};

export default FundamentalsLayout;
