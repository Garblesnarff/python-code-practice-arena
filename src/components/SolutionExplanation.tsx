
import React from 'react';
import { Problem } from '@/data/problems';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SolutionExplanationProps {
  problem: Problem;
  isVisible: boolean;
  onToggle: () => void;
}

const SolutionExplanation: React.FC<SolutionExplanationProps> = ({ 
  problem, 
  isVisible,
  onToggle
}) => {
  if (!problem.solution && !problem.explanation) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="flex items-center gap-1"
        >
          {isVisible ? (
            <>
              <EyeOff size={16} />
              Hide Solution
            </>
          ) : (
            <>
              <Eye size={16} />
              Show Solution
            </>
          )}
        </Button>
        {isVisible && (
          <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 border-yellow-300">
            Learning Aid
          </Badge>
        )}
      </div>
      
      {isVisible && (
        <div className="space-y-4 animate-in fade-in-50 duration-300">
          {problem.solution && (
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">
                Solution Code
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{problem.solution}</code>
              </pre>
            </div>
          )}
          
          {problem.explanation && (
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">
                Explanation
              </div>
              <div className="p-4 text-sm">
                {problem.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SolutionExplanation;
