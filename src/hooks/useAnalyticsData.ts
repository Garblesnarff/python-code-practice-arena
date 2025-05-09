
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface AnalyticsData {
  totalCompletedProblems: number;
  weeklyCompletionChange: number;
  averageCourseCompletion: number;
  courseCompletionChange: number;
  totalXP: number;
  weeklyXPChange: number;
  currentStreak: number;
  progressTimeline: {
    date: string;
    problems: number;
    xp: number;
  }[];
  skillDistribution: {
    topic: string;
    score: number;
    average: number;
  }[];
  learningPatterns: {
    name: string;
    weekday: number;
    weekend: number;
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
    duration: number;
  }[];
}

const fetchAnalyticsData = async (userId: string): Promise<AnalyticsData> => {
  // Get completed problems for timeline data
  const { data: completedProblems } = await supabase
    .from('completed_problems')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: true });
    
  // Get course progress data
  const { data: courseProgress } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', userId);
    
  // Get user profile data
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // Process the data for analytics
  const totalCompletedProblems = completedProblems?.length || 0;
  
  // Calculate completion changes (simulated for now)
  const weeklyCompletionChange = calculateWeeklyChange(completedProblems || []);
  
  // Calculate average course completion
  const avgCourseCompletion = calculateAverageCourseCompletion(courseProgress || []);
  
  // Get totalXP from profile
  const totalXP = profile?.xp || 0;
  
  // Get currentStreak from profile
  const currentStreak = profile?.streak_days || 0;
  
  // Generate timeline data
  const progressTimeline = generateProgressTimeline(completedProblems || []);
  
  // Generate skill distribution data
  const skillDistribution = generateSkillDistribution(completedProblems || [], courseProgress || []);
  
  // Generate learning patterns data
  const learningPatterns = generateLearningPatterns(completedProblems || []);

  return {
    totalCompletedProblems,
    weeklyCompletionChange,
    averageCourseCompletion: avgCourseCompletion,
    courseCompletionChange: 5, // Mock data
    totalXP,
    weeklyXPChange: 8, // Mock data
    currentStreak,
    progressTimeline,
    skillDistribution,
    learningPatterns
  };
};

// Helper function to calculate weekly change in completions
const calculateWeeklyChange = (completedProblems: any[]): number => {
  if (completedProblems.length === 0) return 0;
  
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  
  const lastWeekCompletions = completedProblems.filter(p => 
    new Date(p.completed_at) >= oneWeekAgo && new Date(p.completed_at) <= now
  ).length;
  
  const previousWeekCompletions = completedProblems.filter(p => 
    new Date(p.completed_at) >= twoWeeksAgo && new Date(p.completed_at) < oneWeekAgo
  ).length;
  
  if (previousWeekCompletions === 0) return lastWeekCompletions > 0 ? 100 : 0;
  
  const percentChange = ((lastWeekCompletions - previousWeekCompletions) / previousWeekCompletions) * 100;
  return Math.round(percentChange);
};

// Helper function to calculate average course completion
const calculateAverageCourseCompletion = (courseProgress: any[]): number => {
  if (courseProgress.length === 0) return 0;
  
  const totalPercentage = courseProgress.reduce((sum, course) => {
    const completionPercentage = course.total_problems > 0 
      ? (course.problems_completed / course.total_problems) * 100
      : 0;
    return sum + completionPercentage;
  }, 0);
  
  return Math.round(totalPercentage / courseProgress.length);
};

// Helper function to generate timeline data
const generateProgressTimeline = (completedProblems: any[]) => {
  // Group problems by date
  const problemsByDate: Record<string, { problems: number, xp: number }> = {};
  
  completedProblems.forEach(problem => {
    const date = new Date(problem.completed_at).toISOString().split('T')[0];
    if (!problemsByDate[date]) {
      problemsByDate[date] = { problems: 0, xp: 0 };
    }
    problemsByDate[date].problems += 1;
    problemsByDate[date].xp += problem.xp_earned || 0;
  });
  
  // Convert to array and sort by date
  const result = Object.entries(problemsByDate).map(([date, values]) => ({
    date,
    problems: values.problems,
    xp: values.xp
  })).sort((a, b) => a.date.localeCompare(b.date));
  
  // Ensure we have at least 7 data points for visualization
  if (result.length < 7) {
    const today = new Date();
    for (let i = 0; i < 7 - result.length; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (!problemsByDate[dateStr]) {
        result.push({
          date: dateStr,
          problems: 0,
          xp: 0
        });
      }
    }
    // Sort again after adding empty dates
    result.sort((a, b) => a.date.localeCompare(b.date));
  }
  
  return result;
};

// Helper function to generate skill distribution data
const generateSkillDistribution = (completedProblems: any[], courseProgress: any[]) => {
  // Get unique topics from completedProblems
  const topicIds = [...new Set(completedProblems
    .filter(p => p.topic_id)
    .map(p => p.topic_id))];
  
  // For each topic, calculate a score based on completions
  const result = topicIds.map(topicId => {
    const topicProblems = completedProblems.filter(p => p.topic_id === topicId);
    const score = Math.min(100, topicProblems.length * 10); // Simple scoring system
    
    return {
      topic: `Topic ${topicId.substring(0, 4)}`, // Simplified topic name until we have proper topics
      score,
      average: Math.floor(Math.random() * 50) + 30 // Mock average score for visual comparison
    };
  });
  
  // If we have less than 5 topics, add some mock data for better visualization
  if (result.length < 5) {
    const mockTopics = [
      'Variables', 'Functions', 'Lists', 'Conditionals', 'Loops',
      'Dictionaries', 'Classes', 'Modules'
    ];
    
    for (let i = result.length; i < 5; i++) {
      result.push({
        topic: mockTopics[i % mockTopics.length],
        score: Math.floor(Math.random() * 40) + 30,
        average: Math.floor(Math.random() * 50) + 30
      });
    }
  }
  
  return result;
};

// Helper function to generate learning patterns data
const generateLearningPatterns = (completedProblems: any[]) => {
  // Analyze learning patterns by day of week and time of day
  const patterns = [
    { 
      name: 'Monday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Tuesday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Wednesday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Thursday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Friday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Saturday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    },
    { 
      name: 'Sunday', 
      weekday: 0, weekend: 0, 
      morning: 0, afternoon: 0, evening: 0, night: 0,
      duration: 0
    }
  ];
  
  completedProblems.forEach(problem => {
    const date = new Date(problem.completed_at);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = date.getHours();
    const dayIndex = day === 0 ? 6 : day - 1; // Convert to Monday = 0, Sunday = 6
    
    // Update day of week
    if (day === 0 || day === 6) {
      patterns[dayIndex].weekend += 1;
    } else {
      patterns[dayIndex].weekday += 1;
    }
    
    // Update time of day
    if (hour >= 5 && hour < 12) {
      patterns[dayIndex].morning += 1;
    } else if (hour >= 12 && hour < 17) {
      patterns[dayIndex].afternoon += 1;
    } else if (hour >= 17 && hour < 22) {
      patterns[dayIndex].evening += 1;
    } else {
      patterns[dayIndex].night += 1;
    }
    
    // Mock duration data
    patterns[dayIndex].duration = Math.floor(Math.random() * 30) + 15;
  });
  
  // If no data, add some mock data for better visualization
  if (completedProblems.length === 0) {
    patterns.forEach((pattern, i) => {
      pattern.weekday = Math.floor(Math.random() * 5) + 1;
      pattern.weekend = Math.floor(Math.random() * 3);
      pattern.morning = Math.floor(Math.random() * 3);
      pattern.afternoon = Math.floor(Math.random() * 4) + 1;
      pattern.evening = Math.floor(Math.random() * 5) + 2;
      pattern.night = Math.floor(Math.random() * 2);
      pattern.duration = Math.floor(Math.random() * 30) + 15;
    });
  }
  
  return patterns;
};

export const useAnalyticsData = () => {
  const { user } = useAuth();
  
  const {
    data: analyticsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['analyticsData', user?.id],
    queryFn: () => fetchAnalyticsData(user?.id as string),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    analyticsData,
    isLoading,
    error,
    refetch
  };
};
