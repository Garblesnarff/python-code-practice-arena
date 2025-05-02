
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import { useToast } from '@/components/ui/use-toast';

interface CodeEditorSectionProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onClear: () => void;
  isExecuting: boolean;
}

const CodeEditorSection: React.FC<CodeEditorSectionProps> = ({ 
  code, 
  onChange, 
  onRun, 
  onClear, 
  isExecuting 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Code Editor</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClear}
            title="Clear Code"
          >
            <Trash className="mr-1" size={16} />
            Clear
          </Button>
          <Button 
            size="sm" 
            onClick={onRun} 
            disabled={isExecuting}
          >
            {isExecuting ? 'Running...' : 'Run Tests'}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeEditor 
          code={code} 
          onChange={onChange} 
          isExecuting={isExecuting}
        />
      </div>
    </div>
  );
};

export default CodeEditorSection;
