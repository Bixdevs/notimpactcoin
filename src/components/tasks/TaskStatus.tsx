import React from 'react';
import { TaskStatus as Status } from '../../types/tasks';
import { TASK_STATUS } from '../../constants/tasks';

interface TaskStatusProps {
  status: Status;
  reward: number;
  onClaim: () => void;
}

export function TaskStatus({ status, reward, onClaim }: TaskStatusProps) {
  switch (status) {
    case TASK_STATUS.COMPLETED:
      return (
        <button
          onClick={onClaim}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Claim {reward} coins
        </button>
      );
    
    case TASK_STATUS.CLAIMED:
      return <span className="text-white/60 text-sm">Claimed</span>;
    
    case TASK_STATUS.PENDING:
      return <span className="text-yellow-400 text-sm">In Progress</span>;
    
    default:
      return null;
  }
}