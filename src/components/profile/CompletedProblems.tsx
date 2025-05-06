
import React from 'react';
import { CompletedProblem } from '@/types/user';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, Zap } from 'lucide-react';

interface CompletedProblemsProps {
  completedProblems: CompletedProblem[];
}

const CompletedProblems: React.FC<CompletedProblemsProps> = ({ completedProblems }) => {
  // Group completed problems by difficulty
  const problemsByDifficulty = completedProblems.reduce((acc, problem) => {
    const difficulty = problem.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(problem);
    return acc;
  }, {} as Record<string, CompletedProblem[]>);

  // Calculate total XP earned from problems
  const totalProblemXP = completedProblems.reduce((sum, problem) => sum + problem.xp_earned, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Problems</CardTitle>
        <CardDescription>
          You've completed {completedProblems.length} problems and earned {totalProblemXP} XP.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(problemsByDifficulty).map(([difficulty, problems]) => (
            <div key={difficulty}>
              <h3 className="font-medium capitalize mb-2 flex items-center">
                {difficulty === 'fundamentals' && <BookOpen className="h-4 w-4 mr-1" />}
                {difficulty === 'easy' && <CheckCircle className="h-4 w-4 mr-1" />}
                {difficulty === 'medium' && <Zap className="h-4 w-4 mr-1" />}
                {difficulty}
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
                  {problems.map((problem) => (
                    <div 
                      key={problem.id} 
                      className="text-sm bg-white dark:bg-gray-700 p-2 rounded border"
                    >
                      {problem.problem_id} (+{problem.xp_earned} XP)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {Object.keys(problemsByDifficulty).length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              You haven't completed any problems yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedProblems;
