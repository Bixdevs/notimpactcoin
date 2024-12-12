import React from 'react';
import { Task } from '../../types/tasks';
import { TASK_STATUS } from '../../constants/tasks';
import { TaskProgress } from './TaskProgress';
import { TaskStatus } from './TaskStatus';
import { Link as LinkIcon } from 'lucide-react';
import { verifyAndCompleteTask } from '../../store/tasks/taskVerification';
import { useTaskStore } from '../../store/tasks/useTaskStore';
import { toast } from 'react-hot-toast';

interface TaskCardProps {
  task: Task;
  onClaim: (taskId: string, reward: number) => void;
}

export function TaskCard({ task, onClaim }: TaskCardProps) {
  const { updateTaskStatus } = useTaskStore();

  const handleVerification = async () => {
    if (task.status !== TASK_STATUS.PENDING) return;

    const verified = await verifyAndCompleteTask(task, updateTaskStatus);
    
    if (verified) {
      toast.success('Task completed! Claim your reward.');
    } else {
      toast.error('Could not verify task completion.');
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-medium text-white">
          {task.link ? (
            <a 
              href={task.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-purple-400"
            >
              {task.title}
              <LinkIcon className="w-3 h-3 inline ml-1" />
            </a>
          ) : (
            task.title
          )}
        </h3>
        <p className="text-sm text-white/70">{task.description}</p>
        {task.completionCriteria && (
          <TaskProgress 
            progress={task.completionCriteria.progress}
            target={task.completionCriteria.target}
          />
        )}
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        {task.status === TASK_STATUS.PENDING && (
          <button
            onClick={handleVerification}
            className="text-blue-400 text-sm hover:text-blue-300"
          >
            Verify
          </button>
        )}
        <TaskStatus 
          status={task.status}
          reward={task.reward}
          onClaim={() => onClaim(task.id, task.reward)}
        />
      </div>
    </div>
  );
}