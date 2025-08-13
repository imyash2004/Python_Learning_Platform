import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset?: () => void;
  isRunning?: boolean;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning = false,
  language = 'python',
  height = '400px',
  readOnly = false
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      theme: 'vs-light'
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 text-sm font-medium text-gray-600">
            {language === 'python' ? 'Python' : 'Code'} Editor
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {onReset && (
            <button
              onClick={onReset}
              className="btn btn-sm btn-secondary"
              title="Reset to starter code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={onRun}
            disabled={isRunning}
            className={cn(
              'btn btn-sm',
              isRunning ? 'btn-secondary' : 'btn-primary'
            )}
            title="Run code (Ctrl+Enter)"
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-1" />
                Running
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div onKeyDown={handleKeyDown}>
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            contextmenu: false,
            quickSuggestions: false,
            parameterHints: { enabled: false },
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'off',
            wordBasedSuggestions: "off",
            occurrencesHighlight: "off",
            selectionHighlight: false,
            hover: { enabled: false },
            links: false,
            colorDecorators: false,
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: 'never',
              seedSearchStringFromSelection: 'never'
            }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;