import React from 'react';

interface TaskProgressProps {
  progress: number;
  target: number;
}

export function TaskProgress({ progress, target }: TaskProgressProps) {
  const percentage = (progress / target) * 100;
  
  return (
    <div className="mt-2">
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-white/60 mt-1">
        {progress} / {target}
      </p>
    </div>
  );
}