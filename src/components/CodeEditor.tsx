
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  isExecuting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isExecuting }) => {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  // Focus the editor when it's ready
  useEffect(() => {
    if (isEditorReady && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditorReady]);

  return (
    <div className="h-full w-full relative">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        theme="vs-dark"
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          automaticLayout: true,
          tabSize: 4,
          readOnly: isExecuting
        }}
      />
      {isExecuting && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="spinner animate-spin rounded-full border-2 border-t-transparent border-primary h-8 w-8"></div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
