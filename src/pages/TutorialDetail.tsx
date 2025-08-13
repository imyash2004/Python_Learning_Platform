import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tutorial } from '../types';
import { apiService } from '../services/api';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import OutputPanel from '../components/CodeEditor/OutputPanel';
import Badge from '../components/Badge/Badge';
import { ExecutionResult } from '../types';

const TutorialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadTutorial = async () => {
      if (!id) return;
      
      try {
        const data = await apiService.getTutorial(id);
        if (data) {
          setTutorial(data);
          setCode(data.codeExample);
          setIsCompleted(data.isCompleted || false);
        } else {
          navigate('/tutorials');
        }
      } catch (error) {
        console.error('Failed to load tutorial:', error);
        navigate('/tutorials');
      } finally {
        setLoading(false);
      }
    };

    loadTutorial();
  }, [id, navigate]);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const executionResult = await apiService.executeCode(code);
      setResult(executionResult);
    } catch (error) {
      console.error('Failed to execute code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!tutorial) return;
    
    try {
      await apiService.markTutorialComplete(tutorial.id);
      setIsCompleted(true);
    } catch (error) {
      console.error('Failed to mark tutorial complete:', error);
    }
  };

  const handleResetCode = () => {
    if (tutorial) {
      setCode(tutorial.codeExample);
      setResult(null);
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

  if (!tutorial) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tutorial not found</h2>
        <Link to="/tutorials" className="btn btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tutorials
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/tutorials"
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tutorials
        </Link>
        
        {!isCompleted && (
          <button
            onClick={handleMarkComplete}
            className="btn btn-success btn-sm"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Complete
          </button>
        )}
      </div>

      {/* Tutorial Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="card-body space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  Tutorial {tutorial.order}
                </span>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-success-600" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{tutorial.title}</h1>
              <p className="text-gray-600">{tutorial.description}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant={getDifficultyColor(tutorial.difficulty) as any}>
                {tutorial.difficulty}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{tutorial.estimatedTime}min</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tutorial Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Tutorial Content</h2>
            </div>
            <div className="card-body">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: tutorial.content.replace(/\n/g, '<br>').replace(/```python\n(.*?)\n```/gs, '<pre><code>$1</code></pre>') 
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Try It Yourself</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Run the example code</span>
                <Play className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
              height="300px"
            />
          </div>

          <OutputPanel
            result={result}
            isRunning={isRunning}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <div>
          {tutorial.order > 1 && (
            <Link
              to={`/tutorials/${tutorial.order - 1}`}
              className="btn btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Tutorial
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {!isCompleted && (
            <button
              onClick={handleMarkComplete}
              className="btn btn-success"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Complete
            </button>
          )}
          
          <Link
            to={`/tutorials/${tutorial.order + 1}`}
            className="btn btn-primary"
          >
            Next Tutorial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;