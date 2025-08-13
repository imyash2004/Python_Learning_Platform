import React from 'react';
import { Terminal, CheckCircle, XCircle, Clock, MemoryStick } from 'lucide-react';
import { ExecutionResult } from '../../types';

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  input?: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ result, isRunning, input }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Output</span>
        </div>
        
        {result && (
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{result.executionTime}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <MemoryStick className="w-3 h-3" />
              <span>{Math.round(result.memoryUsed / 1024)}KB</span>
            </div>
            <div className="flex items-center space-x-1">
              {result.success ? (
                <CheckCircle className="w-3 h-3 text-success-600" />
              ) : (
                <XCircle className="w-3 h-3 text-error-600" />
              )}
              <span className={result.success ? 'text-success-600' : 'text-error-600'}>
                {result.success ? 'Success' : 'Error'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {isRunning ? (
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"></div>
            <span className="text-sm">Executing code<span className="loading-dots"></span></span>
          </div>
        ) : result ? (
          <div className="space-y-3">
            {/* Input section */}
            {input && input.trim() && (
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">Input:</div>
                <pre className="text-sm bg-gray-100 p-2 rounded border text-gray-700 whitespace-pre-wrap">
                  {input}
                </pre>
              </div>
            )}
            
            {/* Output section */}
            {result.output && (
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">Output:</div>
                <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded font-mono whitespace-pre-wrap">
                  {result.output}
                </pre>
              </div>
            )}
            
            {/* Error section */}
            {result.error && (
              <div>
                <div className="text-xs font-medium text-error-600 mb-1">Error:</div>
                <pre className="text-sm bg-error-50 text-error-700 p-3 rounded border border-error-200 whitespace-pre-wrap">
                  {result.error}
                </pre>
              </div>
            )}
            
            {/* Empty output */}
            {!result.output && !result.error && (
              <div className="text-sm text-gray-500 italic">
                No output produced
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Click "Run" to execute your code
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;