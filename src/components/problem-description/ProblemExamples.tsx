
import React from 'react';
import { Problem } from '@/data/problems';

interface ProblemExamplesProps {
  examples: Problem['examples'];
}

const ProblemExamples: React.FC<ProblemExamplesProps> = ({ examples }) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Examples:</h2>
      <div className="space-y-3">
        {examples.map((example, index) => (
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
  );
};

export default ProblemExamples;
