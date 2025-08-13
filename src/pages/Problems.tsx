import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, CheckCircle, Clock, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Problem } from '../types';
import { apiService } from '../services/api';
import Badge from '../components/Badge/Badge';

const Problems: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await apiService.getProblems();
        setProblems(data);
      } catch (error) {
        console.error('Failed to load problems:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'gray';
    }
  };

  const categories = ['all', ...Array.from(new Set(problems.map(p => p.category)))];

  const filteredProblems = problems.filter(problem => {
    const statusMatch = filter === 'all' || 
      (filter === 'solved' && problem.isSolved) ||
      (filter === 'unsolved' && !problem.isSolved);
    
    const categoryMatch = categoryFilter === 'all' || problem.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  const solvedCount = problems.filter(p => p.isSolved).length;

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
          Practice Problems
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Strengthen your Python skills by solving coding challenges. 
          Each problem includes test cases and instant feedback.
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary-600">{problems.length}</div>
            <div className="text-sm text-gray-600">Total Problems</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-success-600">{solvedCount}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-warning-600">
              {Math.round((solvedCount / problems.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="input text-sm py-1"
                >
                  <option value="all">All Problems</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input text-sm py-1"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem, index) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card hover:shadow-lg transition-all duration-200 group"
          >
            <div className="card-body space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    problem.isSolved ? 'bg-success-100' : 'bg-gray-100'
                  }`}>
                    {problem.isSolved ? (
                      <CheckCircle className="w-4 h-4 text-success-600" />
                    ) : (
                      <Code2 className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-500 capitalize">
                    {problem.category}
                  </span>
                </div>
                {problem.isSolved && (
                  <Badge variant="success" size="sm">Solved</Badge>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {problem.description.split('\n')[0]}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between">
                <Badge variant={getDifficultyColor(problem.difficulty) as any}>
                  {problem.difficulty}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~15min</span>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/problems/${problem.id}`}
                className="btn btn-primary btn-sm w-full group-hover:bg-primary-700 transition-colors"
              >
                <Code2 className="w-4 h-4 mr-2" />
                {problem.isSolved ? 'Review' : 'Solve'} Problem
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProblems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Code2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No problems found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new challenges.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Problems;