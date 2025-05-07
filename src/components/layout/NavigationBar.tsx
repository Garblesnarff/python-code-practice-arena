
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, ChevronDown, Home, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { getCourses } from '@/services/courseService';
import { Course } from '@/types/user';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavigationBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Python Learning Arena</span>
            </Link>
            <nav className="ml-6 flex items-center space-x-4">
              <Link to="/" className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                <Home className="h-5 w-5 mr-1 inline" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9">
                      <Book className="h-5 w-5 mr-1 inline" />
                      <span className="hidden sm:inline">Courses</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {loading ? (
                          <li className="p-2">Loading courses...</li>
                        ) : (
                          courses.map((course) => (
                            <ListItem
                              key={course.id}
                              title={course.title}
                              href={`/courses/${course.id}`}
                            >
                              {course.description.substring(0, 60)}...
                            </ListItem>
                          ))
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/fundamentals" className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/fundamentals' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                Fundamentals
              </Link>
              <Link to="/easy" className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/easy' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                Easy
              </Link>
              <Link to="/medium" className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/medium' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                Medium
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link to="/profile" className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/profile' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                  <User className="h-5 w-5 mr-1 inline" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Button variant="ghost" onClick={handleSignOut} className="ml-2">
                  <LogOut className="h-5 w-5 mr-1 inline" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="ml-2">
                  <LogIn className="h-5 w-5 mr-1 inline" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
