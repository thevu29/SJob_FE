'use client';

import { cn } from '@/lib/utils';

interface ProfileCompletionCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  colorClass?: string;
}

export function ProfileCompletionCircle({
  percentage,
  size = 120,
  strokeWidth = 4,
  showText = true,
  colorClass
}: ProfileCompletionCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage * circumference) / 100;

  const defaultColorClass =
    percentage >= 75
      ? 'text-green-500'
      : percentage >= 50
        ? 'text-amber-500'
        : 'text-red-500';
  const finalColorClass = colorClass || defaultColorClass;

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className='rotate-[-90deg]'
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          className='text-muted/30'
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap='round'
          className={cn(
            'transition-all duration-1000 ease-out',
            finalColorClass
          )}
        />
      </svg>

      {showText && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <span className='text-xl font-bold'>{percentage}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
