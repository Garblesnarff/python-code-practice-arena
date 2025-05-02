
import { Problem } from '../data/problems';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import SolutionExplanation from './SolutionExplanation';
import { useState } from 'react';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <Badge className={`${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </Badge>
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Function Signature:</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto">
            <code>{problem.signature_hint}</code>
          </pre>
        </div>

        {problem.examples.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Examples:</h2>
            <div className="space-y-3">
              {problem.examples.map((example, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="mb-1">
                    <span className="font-medium">Input:</span> <code>{example.input}</code>
                  </div>
                  <div>
                    <span className="font-medium">Output:</span> <code>{example.output}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
