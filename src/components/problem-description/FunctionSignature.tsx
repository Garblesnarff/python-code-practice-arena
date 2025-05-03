
import React from 'react';

interface FunctionSignatureProps {
  signature: string;
}

const FunctionSignature: React.FC<FunctionSignatureProps> = ({ signature }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Function Signature:</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto">
        <code>{signature}</code>
      </pre>
    </div>
  );
};

export default FunctionSignature;
