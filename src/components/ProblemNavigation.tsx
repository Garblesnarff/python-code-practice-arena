
import { Problem } from '../data/problems';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProblemNavigationProps {
  problems: Problem[];
  currentProblemIndex: number;
  onSelectProblem: (index: number) => void;
}

const ProblemNavigation: React.FC<ProblemNavigationProps> = ({ 
  problems, 
  currentProblemIndex, 
  onSelectProblem 
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
      <div className="text-sm font-medium">
        Problem {currentProblemIndex + 1} of {problems.length}
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
