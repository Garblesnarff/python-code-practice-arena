
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
        <Button variant="outline" className="ml-2" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
