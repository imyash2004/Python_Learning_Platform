import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tutorial } from '../types';
import { apiService } from '../services/api';
import Badge from '../components/Badge/Badge';

const Tutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        const data = await apiService.getTutorials();
        setTutorials(data);
      } catch (error) {
        console.error('Failed to load tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTutorials();
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Python Tutorials
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Learn Python programming step-by-step with our interactive tutorials. 
          Each tutorial includes explanations, examples, and hands-on practice.
        </motion.p>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
              <p className="text-gray-600">
                {tutorials.filter(t => t.isCompleted).length} of {tutorials.length} tutorials completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round((tutorials.filter(t => t.isCompleted).length / tutorials.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-all duration-200 group"
          >
            <div className="card-body space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Tutorial {tutorial.order}
                  </span>
                </div>
                {tutorial.isCompleted && (
                  <CheckCircle className="w-5 h-5 text-success-600" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {tutorial.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between">
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

              {/* Action */}
              <Link
                to={`/tutorials/${tutorial.id}`}
                className="btn btn-primary btn-sm w-full group-hover:bg-primary-700 transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                {tutorial.isCompleted ? 'Review' : 'Start'} Tutorial
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {tutorials.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tutorials available</h3>
          <p className="text-gray-600">Check back later for new learning content.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Tutorials;