
import { Problem } from '../data/problems';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import SolutionExplanation from './SolutionExplanation';
import { useState } from 'react';
import { getDifficultyColor, getProgrammingConcepts, getPythonOperators } from '@/utils/problemHelpers';
import ProgrammingConcepts from './problem-description/ProgrammingConcepts';
import OperatorsReference from './problem-description/OperatorsReference';
import ProblemHeader from './problem-description/ProblemHeader';
import FunctionSignature from './problem-description/FunctionSignature';
import ProblemExamples from './problem-description/ProblemExamples';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  // Check if the current problem is about operators
  const shouldShowOperators = problem.id === "is_even";
  const operators = getPythonOperators();
  
  // Get the programming concepts for this problem
  const programmingConcepts = getProgrammingConcepts(problem.id);

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex flex-col gap-4">
        <ProblemHeader 
          problem={problem} 
          getDifficultyColor={getDifficultyColor} 
        />
        
        <ProgrammingConcepts concepts={programmingConcepts} />
        
        <OperatorsReference 
          operators={operators} 
          showOperators={shouldShowOperators} 
        />
        
        <FunctionSignature signature={problem.signature_hint} />

        <ProblemExamples examples={problem.examples} />
        
        <SolutionExplanation 
          problem={problem} 
          isVisible={showSolution} 
          onToggle={toggleSolution} 
        />
      </div>
    </div>
  );
};

export default ProblemDescription;
