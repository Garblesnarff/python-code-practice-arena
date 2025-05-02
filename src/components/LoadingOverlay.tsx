
import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Loading Python environment..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-primary"></div>
          <p className="text-lg font-medium">{message}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            This may take a moment the first time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
