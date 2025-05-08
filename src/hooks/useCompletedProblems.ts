
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCompletedProblems } from '@/services/gamificationService';
import { CompletedProblem } from '@/types/user';

export const useCompletedProblems = () => {
  const [completedProblems, setCompletedProblems] = useState<CompletedProblem[]>([]);
  const { user } = useAuth();

  // Load completed problems when user changes
  useEffect(() => {
    const loadCompletedProblems = async () => {
      if (user) {
        const problems = await getCompletedProblems(user.id);
        setCompletedProblems(problems);
      }
    };
    
    loadCompletedProblems();
  }, [user]);

  const refreshCompletedProblems = async () => {
    if (user) {
      const problems = await getCompletedProblems(user.id);
      setCompletedProblems(problems);
      return problems;
    }
    return [];
  };

  const isProblemCompleted = (problemId: string) => {
    return completedProblems.some(p => p.problem_id === problemId);
  };

  return {
    completedProblems,
    refreshCompletedProblems,
    isProblemCompleted
  };
};
