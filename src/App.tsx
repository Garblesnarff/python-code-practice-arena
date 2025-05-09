
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

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
import DailyChallenges from '@/pages/DailyChallenges';
import DailyChallengePage from '@/pages/DailyChallengePage';
import LearningPaths from '@/pages/LearningPaths';
import LearningPathPage from '@/pages/LearningPathPage';

const App = () => {
  return (
    <>
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
        
        {/* Gamification routes */}
        <Route path="/daily-challenges" element={<DailyChallenges />} />
        <Route path="/challenge/:problemId" element={<DailyChallengePage />} />
        <Route path="/learning-paths" element={<LearningPaths />} />
        <Route path="/learning-path/:pathId" element={<LearningPathPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
