
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { completeProblem } from '@/services/gamificationService';
import { Problem } from '@/data/problems';
import { useProfileData } from '@/hooks/useProfileData';
import { updateCourseProgressAfterProblemCompletion } from '@/services/courseService';

import { usePyodide } from './usePyodide';
import { useNotifications } from './useNotifications';
import { useCompletedProblems } from './useCompletedProblems';
import { useCodeExecution } from './useCodeExecution';

interface UseProblemExecutionProps {
  problem: Problem;
  difficulty: string;
  courseId?: string;
  topicId?: string;
}

export const useProblemExecution = ({ problem, difficulty, courseId, topicId }: UseProblemExecutionProps) => {
  const { isPyodideLoading } = usePyodide();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { refreshAllProfileData } = useProfileData();
  
  const { 
    xpNotification, 
    levelUpNotification,
    showXPNotification,
    handleNotificationClose,
    handleLevelUpNotificationClose
  } = useNotifications();
  
  const {
    completedProblems,
    refreshCompletedProblems,
    isProblemCompleted
  } = useCompletedProblems();
  
  const {
    code,
    testResults,
    isExecuting,
    handleCodeChange,
    executeCode,
    handleClearCode,
    resetCode
  } = useCodeExecution(problem);

  // Reset code when problem changes
  useEffect(() => {
    resetCode();
  }, [problem]);

  const handleRunTests = async () => {
    const results = await executeCode(problem.test_cases);
    
    if (!results) return;
    
    // Check if all tests passed and award XP
    if (results.summary.passed === results.summary.total && user) {
      // Check if problem already completed
      const isAlreadyCompleted = completedProblems.some(
        p => p.problem_id === problem.id
      );
      
      if (!isAlreadyCompleted) {
        const prevLevel = profile?.level || 1;
        const { success, xpGained } = await completeProblem(
          user.id,
          problem.id,
          difficulty,
          courseId,
          topicId
        );
        
        if (success && xpGained > 0) {
          // Refresh profile data to update XP and level
          const updatedProfile = await refreshAllProfileData();
          
          // Show XP notification
          showXPNotification(`+${xpGained} XP gained!`);
          
          // Refresh completed problems
          await refreshCompletedProblems();
          
          // Update course progress if courseId provided
          if (courseId) {
            await updateCourseProgressAfterProblemCompletion(user.id, courseId, true);
          }
          
          // Check for level up
          if (updatedProfile && updatedProfile.level > prevLevel) {
            setTimeout(() => {
              showXPNotification(`Level up! You're now level ${updatedProfile.level}!`, 'level');
            }, 4000); // Show after the XP notification disappears
          }
        }
      }
      
      toast({
        title: 'Success!',
        description: `All ${results.summary.total} tests passed! 🎉`,
        variant: 'default'
      });
    } else {
      toast({
        title: 'Tests Completed',
        description: `Passed ${results.summary.passed} of ${results.summary.total} tests.`,
        variant: 'default'
      });
    }
  };

  return {
    code,
    testResults,
    isPyodideLoading,
    isExecuting,
    xpNotification,
    levelUpNotification,
    completedProblems,
    isProblemCompleted,
    handleCodeChange,
    handleRunTests,
    handleClearCode,
    handleNotificationClose,
    handleLevelUpNotificationClose
  };
};
