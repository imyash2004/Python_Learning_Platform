import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Trophy, Play, CheckCircle, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import { User } from '../types';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Badge from '../components/Badge/Badge';

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = apiService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Tutorials',
      description: 'Learn Python step-by-step with hands-on examples and explanations.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Code2,
      title: 'Practice Problems',
      description: 'Solve coding challenges to reinforce your learning and build confidence.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Play,
      title: 'Online Compiler',
      description: 'Write and run Python code directly in your browser with instant feedback.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your learning journey and celebrate your achievements.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const stats = [
    { label: 'Active Learners', value: '10,000+', icon: Users },
    { label: 'Tutorials', value: '50+', icon: BookOpen },
    { label: 'Practice Problems', value: '200+', icon: Code2 },
    { label: 'Success Rate', value: '95%', icon: CheckCircle }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Learn <span className="text-primary-600">Python</span> Programming
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Python programming with interactive tutorials, hands-on practice problems, 
            and an integrated online compiler. Start your coding journey today!
          </p>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="card">
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Welcome back, {user.name}!</h3>
                  <Badge variant="success">
                    {user.progress.problemsSolved} solved
                  </Badge>
                </div>
                <ProgressBar 
                  progress={user.progress.completionPercentage}
                  color="success"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{user.progress.tutorialsCompleted} tutorials completed</span>
                  <span>{user.progress.streak} day streak 🔥</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/tutorials" className="btn btn-primary btn-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Start Learning
          </Link>
          <Link to="/problems" className="btn btn-secondary btn-lg">
            <Code2 className="w-5 h-5 mr-2" />
            Practice Problems
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose PyLearn?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to master Python programming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <Icon className="w-8 h-8 text-primary-600 mx-auto" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Learning Path Preview */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Your Learning Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our structured curriculum designed for beginners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="card-body space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Learn Basics</h3>
              </div>
              <p className="text-gray-600">
                Start with variables, data types, and basic Python syntax through interactive tutorials.
              </p>
              <Link to="/tutorials" className="btn btn-primary btn-sm">
                Start Tutorial
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="card-body space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold">Practice Coding</h3>
              </div>
              <p className="text-gray-600">
                Apply your knowledge by solving beginner-friendly programming challenges.
              </p>
              <Link to="/problems" className="btn btn-success btn-sm">
                Solve Problems
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="card-body space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold">Track Progress</h3>
              </div>
              <p className="text-gray-600">
                Monitor your learning journey and see how far you've come with detailed analytics.
              </p>
              <Link to="/dashboard" className="btn btn-secondary btn-sm">
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-600 text-white rounded-2xl p-12 space-y-6">
        <h2 className="text-3xl font-bold">Ready to Start Your Python Journey?</h2>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
          Join thousands of learners who have successfully mastered Python programming with PyLearn
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tutorials" className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Start First Tutorial
          </Link>
          <Link to="/problems" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg">
            <Code2 className="w-5 h-5 mr-2" />
            Browse Problems
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;