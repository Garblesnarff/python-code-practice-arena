
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Award, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { updateLoginStreak } from '@/services/gamificationService';

const Index = () => {
  const { user, profile } = useAuth();

  // Update login streak when user loads the page
  useEffect(() => {
    if (user) {
      updateLoginStreak(user.id);
    }
  }, [user]);

  const categories = [
    {
      title: "Python Fundamentals",
      description: "New to programming? Start here to learn the basics of Python programming - variables, functions, conditionals, and more.",
      path: "/fundamentals",
      color: "bg-blue-500",
      level: "Beginner"
    },
    {
      title: "Easy Problems",
      description: "Ready for a challenge? Practice with simple problems focusing on lists, strings, and basic algorithms.",
      path: "/easy",
      color: "bg-green-500",
      level: "Easy"
    },
    {
      title: "Medium Problems",
      description: "Build your problem-solving skills with more complex challenges involving multiple concepts.",
      path: "/medium",
      color: "bg-yellow-500", 
      level: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Python Learning Arena</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Master Python programming through interactive challenges - from basics to advanced concepts.
              </p>
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                {profile && (
                  <div className="text-right mr-2">
                    <div className="text-sm font-medium">Level {profile.level}</div>
                    <div className="text-xs text-gray-500">{profile.xp} XP</div>
                  </div>
                )}
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={category.path} key={index} className="block">
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className={`${category.color} text-white rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                      {category.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-sm font-medium">Start Learning</span>
                  <ChevronRight className="h-5 w-5" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {user && profile && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="mr-2 text-yellow-500" />
              Your Learning Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-300 mb-1">Current Level</div>
                <div className="text-2xl font-bold">{profile.level}</div>
                <div className="text-xs text-gray-500 mt-1">{profile.xp_to_next_level} XP to next level</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-300 mb-1">Day Streak</div>
                <div className="text-2xl font-bold">{profile.streak_days}</div>
                <div className="text-xs text-gray-500 mt-1">Keep it going!</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Total XP</div>
                <div className="text-2xl font-bold">{profile.xp}</div>
                <div className="text-xs text-gray-500 mt-1">Keep solving problems to earn more!</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">About This Learning Platform</h2>
          <p className="mb-4">
            This platform is designed to help you learn Python programming from scratch, with a focus on understanding the fundamentals first before tackling more complex problems.
          </p>
          <p className="mb-4">
            Each challenge comes with:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li>Clear problem descriptions</li>
            <li>Example inputs and outputs</li>
            <li>Starter code to help you begin</li>
            <li>Step-by-step explanations of solutions</li>
            <li>Automated tests to verify your solutions</li>
          </ul>
          <p>
            Start with the Python Fundamentals section if you're new to programming, or jump straight to Easy Problems if you're familiar with basic concepts.
          </p>
          
          {!user && (
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Track Your Progress</h3>
              <p className="mb-3">
                Create an account to track your progress, earn XP, level up, and unlock achievements as you learn!
              </p>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 shadow mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
      Python Learning Arena - Master Python programming through practice
    </div>
  </footer>
);

export default Index;
