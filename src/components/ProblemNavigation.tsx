
import { Problem } from '../data/problems';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ProblemNavigationProps {
  problems: Problem[];
  currentProblemIndex: number;
  onSelectProblem: (index: number) => void;
  completedProblems?: string[];
}

const ProblemNavigation: React.FC<ProblemNavigationProps> = ({ 
  problems, 
  currentProblemIndex, 
  onSelectProblem,
  completedProblems = []
}) => {
  const hasPrevious = currentProblemIndex > 0;
  const hasNext = currentProblemIndex < problems.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      onSelectProblem(currentProblemIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectProblem(currentProblemIndex + 1);
    }
  };

  const isProblemCompleted = (problemId: string) => {
    return completedProblems.includes(problemId);
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={!hasPrevious}
        size="sm"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </Button>
      <div className="text-sm font-medium flex items-center">
        Problem {currentProblemIndex + 1} of {problems.length}
        {isProblemCompleted(problems[currentProblemIndex].id) && (
          <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
        )}
      </div>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={!hasNext}
        size="sm"
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProblemNavigation;
