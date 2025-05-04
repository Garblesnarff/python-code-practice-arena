
import React from 'react';

interface FunctionSignatureProps {
  signature: string;
}

const FunctionSignature: React.FC<FunctionSignatureProps> = ({ signature }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Function Signature:</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto border-l-4 border-blue-500">
        <code className="text-blue-600 dark:text-blue-400 font-medium">{signature}</code>
      </pre>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Your solution must match this function signature exactly.
      </p>
    </div>
  );
};

export default FunctionSignature;
