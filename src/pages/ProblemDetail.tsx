import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Code2, Play, Send, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Problem, ExecutionResult } from '../types';
import { apiService } from '../services/api';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import OutputPanel from '../components/CodeEditor/OutputPanel';
import Badge from '../components/Badge/Badge';

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<boolean | null>(null);

  useEffect(() => {
    const loadProblem = async () => {
      if (!id) return;
      
      try {
        const data = await apiService.getProblem(id);
        if (data) {
          setProblem(data);
          setCode(data.starterCode);
          setInput(data.sampleInput);
        } else {
          navigate('/problems');
        }
      } catch (error) {
        console.error('Failed to load problem:', error);
        navigate('/problems');
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id, navigate]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setSubmissionResult(null);
    try {
      const executionResult = await apiService.executeCode(code, input);
      setResult(executionResult);
    } catch (error) {
      console.error('Failed to execute code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    try {
      const success = await apiService.submitSolution(problem.id, code);
      setSubmissionResult(success);
      
      if (success) {
        // Update problem status
        setProblem(prev => prev ? { ...prev, isSolved: true } : null);
      }
    } catch (error) {
      console.error('Failed to submit solution:', error);
      setSubmissionResult(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetCode = () => {
    if (problem) {
      setCode(problem.starterCode);
      setResult(null);
      setSubmissionResult(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem not found</h2>
        <Link to="/problems" className="btn btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Problems
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/problems"
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Problems
        </Link>
        
        {problem.isSolved && (
          <Badge variant="success">
            <CheckCircle className="w-4 h-4 mr-1" />
            Solved
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Problem Info */}
          <div className="card">
            <div className="card-body space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-gray-500 capitalize">
                      {problem.category}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
                </div>
                
                <Badge variant={getDifficultyColor(problem.difficulty) as any}>
                  {problem.difficulty}
                </Badge>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">
                  {problem.description}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Input/Output */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Sample Input & Output</h3>
            </div>
            <div className="card-body space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Input:</h4>
                <pre className="text-sm bg-gray-100 p-3 rounded border font-mono">
                  {problem.sampleInput || '(No input required)'}
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
                <pre className="text-sm bg-gray-100 p-3 rounded border font-mono">
                  {problem.sampleOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Constraints</h3>
            </div>
            <div className="card-body">
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {problem.constraints}
              </div>
            </div>
          </div>

          {/* Submission Result */}
          {submissionResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card border-2 ${
                submissionResult 
                  ? 'border-success-200 bg-success-50' 
                  : 'border-error-200 bg-error-50'
              }`}
            >
              <div className="card-body">
                <div className="flex items-center space-x-2">
                  {submissionResult ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-success-800">
                        Congratulations! Your solution is correct.
                      </span>
                    </>
                  ) : (
                    <>
                      <Code2 className="w-5 h-5 text-error-600" />
                      <span className="font-medium text-error-800">
                        Solution incorrect. Please try again.
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Input Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Test Input</h3>
            </div>
            <div className="card-body">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter test input here..."
                className="input font-mono text-sm"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">
                Modify the input to test different cases
              </p>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Solution</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetCode}
                  className="btn btn-secondary btn-sm"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn btn-primary btn-sm"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {isRunning ? 'Running...' : 'Test'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-success btn-sm"
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
            
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
              height="400px"
            />
          </div>

          {/* Output Panel */}
          <OutputPanel
            result={result}
            isRunning={isRunning}
            input={input}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemDetail;