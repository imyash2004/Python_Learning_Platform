import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showLabel = true,
  size = 'md',
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600'
  };

  const backgroundClasses = {
    primary: 'bg-primary-100',
    success: 'bg-success-100',
    warning: 'bg-warning-100'
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full rounded-full overflow-hidden',
        sizeClasses[size],
        backgroundClasses[color]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            colorClasses[color]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;