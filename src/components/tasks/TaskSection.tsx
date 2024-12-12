import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Task } from '../../types/tasks';

interface TaskSectionProps {
  title: string;
  icon: LucideIcon;
  tasks: Task[];
  onClaim: (taskId: string, reward: number) => void;
}

export function TaskSection({ title, icon: Icon, tasks, onClaim }: TaskSectionProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon className="w-5 h-5 text-white" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClaim={onClaim}
          />
        ))}
        
        {tasks.length === 0 && (
          <p className="text-center text-white/60 py-4">No tasks available</p>
        )}
      </div>
    </div>
  );
}