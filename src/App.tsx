
import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, SettingsIcon, User, BarChart2, Compass } from "lucide-react"
import { cn } from "@/lib/utils"

import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import Fundamentals from '@/pages/Fundamentals';
import EasyProblems from '@/pages/EasyProblems';
import MediumProblems from '@/pages/MediumProblems';
import HardProblems from '@/pages/HardProblems';
import ProblemPage from '@/pages/ProblemPage';
import CourseDashboard from '@/pages/CourseDashboard';
import TopicDashboard from '@/pages/TopicDashboard';
import NotFound from '@/pages/NotFound';
import CommandMenu from './components/layout/CommandMenu';
import MainNav from './components/layout/MainNav';
import NavigationBar from '@/components/layout/NavigationBar';
import ThemeSwitcher from './components/layout/ThemeSwitcher';
import DailyChallenges from '@/pages/DailyChallenges';
import DailyChallengePage from '@/pages/DailyChallengePage';
import LearningPaths from '@/pages/LearningPaths';
import LearningPathPage from '@/pages/LearningPathPage';

const queryClient = new QueryClient();

const App = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in on app load
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true' && !user) {
      // Refresh the auth state if logged in
      // You might need to re-fetch user data here
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SearchProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/fundamentals" element={<Fundamentals />} />
              <Route path="/easy" element={<EasyProblems />} />
              <Route path="/medium" element={<MediumProblems />} />
              <Route path="/hard" element={<HardProblems />} />
              <Route path="/problem/:id" element={<ProblemPage />} />
              <Route path="/course/:id" element={<CourseDashboard />} />
              <Route path="/topic/:id" element={<TopicDashboard />} />
              
              {/* New gamification routes */}
              <Route path="/daily-challenges" element={<DailyChallenges />} />
              <Route path="/challenge/:problemId" element={<DailyChallengePage />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-path/:pathId" element={<LearningPathPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
