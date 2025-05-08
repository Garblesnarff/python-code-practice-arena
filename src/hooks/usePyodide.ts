
import { useState, useEffect } from 'react';
import { initPyodide } from '@/services/pythonService';
import { useToast } from '@/components/ui/use-toast';

export const usePyodide = () => {
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setIsPyodideLoading(true);
        await initPyodide();
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize Python environment. Please reload the page.',
          variant: 'destructive'
        });
      } finally {
        setIsPyodideLoading(false);
      }
    };

    loadPyodide();
  }, [toast]);

  return { isPyodideLoading };
};
