import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, BookOpen, Code2, Calendar, Target, Flame, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { User, Tutorial, Problem } from '../types';
import { apiService } from '../services/api';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Badge from '../components/Badge/Badge';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const currentUser = apiService.getCurrentUser();
        const [tutorialsData, problemsData] = await Promise.all([
          apiService.getTutorials(),
          apiService.getProblems()
        ]);
        
        setUser(currentUser);
        setTutorials(tutorialsData);
        setProblems(problemsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
      </div>
    );
  }

  const recentTutorials = tutorials.filter(t => t.isCompleted).slice(-3);
  const recentProblems = problems.filter(p => p.isSolved).slice(-5);
  const nextTutorial = tutorials.find(t => !t.isCompleted);
  const nextProblem = problems.find(p => !p.isSolved);

  const stats = [
    {
      label: 'Problems Solved',
      value: user.progress.problemsSolved,
      total: user.progress.totalProblems,
      icon: Code2,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Tutorials Completed',
      value: user.progress.tutorialsCompleted,
      total: tutorials.length,
      icon: BookOpen,
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      label: 'Current Streak',
      value: user.progress.streak,
      total: null,
      icon: Flame,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      label: 'Overall Progress',
      value: user.progress.completionPercentage,
      total: 100,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here's your learning progress and achievements
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {stat.label === 'Current Streak' && stat.value > 0 && (
                    <Badge variant="warning" size="sm">🔥 Hot!</Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                    {stat.total && (
                      <span className="text-sm text-gray-500">
                        / {stat.total}
                      </span>
                    )}
                    {stat.label === 'Overall Progress' && (
                      <span className="text-sm text-gray-500">%</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </div>
                  
                  {stat.total && stat.label !== 'Overall Progress' && (
                    <ProgressBar
                      progress={(stat.value / stat.total) * 100}
                      showLabel={false}
                      size="sm"
                      color={stat.color.includes('primary') ? 'primary' : 
                            stat.color.includes('success') ? 'success' : 'warning'}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <Badge variant="primary">
              {user.progress.completionPercentage}% Complete
            </Badge>
          </div>
        </div>
        <div className="card-body space-y-4">
          <ProgressBar
            progress={user.progress.completionPercentage}
            color="primary"
            size="lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tutorials:</span>
              <span className="font-medium">
                {user.progress.tutorialsCompleted} / {tutorials.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Problems:</span>
              <span className="font-medium">
                {user.progress.problemsSolved} / {user.progress.totalProblems}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Continue Learning
            </h2>
          </div>
          <div className="card-body space-y-4">
            {nextTutorial ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-gray-600">Next Tutorial</span>
                </div>
                <h3 className="font-semibold text-gray-900">{nextTutorial.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {nextTutorial.description}
                </p>
                <Link
                  to={`/tutorials/${nextTutorial.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Continue Tutorial
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">All tutorials completed! 🎉</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Practice Problems */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold flex items-center">
              <Code2 className="w-5 h-5 mr-2 text-success-600" />
              Practice Problems
            </h2>
          </div>
          <div className="card-body space-y-4">
            {nextProblem ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-success-600" />
                  <span className="text-sm font-medium text-gray-600">Recommended Problem</span>
                </div>
                <h3 className="font-semibold text-gray-900">{nextProblem.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {nextProblem.description.split('\n')[0]}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm">{nextProblem.difficulty}</Badge>
                  <Badge variant="gray" size="sm">{nextProblem.category}</Badge>
                </div>
                <Link
                  to={`/problems/${nextProblem.id}`}
                  className="btn btn-success btn-sm"
                >
                  Solve Problem
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <Code2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">All problems solved! 🏆</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
              Recently Completed Tutorials
            </h2>
          </div>
          <div className="card-body">
            {recentTutorials.length > 0 ? (
              <div className="space-y-3">
                {recentTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-success-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                        <p className="text-sm text-gray-600">Tutorial {tutorial.order}</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Completed</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-600">
                No tutorials completed yet
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold flex items-center">
              <Code2 className="w-5 h-5 mr-2 text-success-600" />
              Recently Solved Problems
            </h2>
          </div>
          <div className="card-body">
            {recentProblems.length > 0 ? (
              <div className="space-y-3">
                {recentProblems.map((problem) => (
                  <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-success-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{problem.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">{problem.category}</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Solved</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-600">
                No problems solved yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;