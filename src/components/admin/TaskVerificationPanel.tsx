import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../../store/tasks/useTaskStore';
import { useAdminStore } from '../../store/admin/useAdminStore';
import { TASK_STATUS } from '../../constants/tasks';
import { toast } from 'react-hot-toast';

export function TaskVerificationPanel() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const { adminActions } = useAdminStore();

  const pendingVerifications = tasks.filter(
    task => task.status === TASK_STATUS.COMPLETED && !task.verified
  );

  const handleVerification = async (taskId: string, approved: boolean) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (approved) {
      // Approve task and grant reward
      adminActions.approveTask(taskId);
      toast.success('Task approved and reward granted!');
    } else {
      // Reject task and apply penalty if configured
      adminActions.rejectTask(taskId);
      toast.error('Task rejected');
    }
  };

  if (pendingVerifications.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center space-x-2 text-white/60">
          <AlertCircle className="w-5 h-5" />
          <p>No tasks pending verification</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4">Pending Verifications</h3>
      <div className="space-y-4">
        {pendingVerifications.map(task => (
          <div key={task.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white">{task.title}</h4>
                <p className="text-sm text-white/70">{task.description}</p>
                <p className="text-sm text-yellow-400 mt-1">Reward: {task.reward} coins</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleVerification(task.id, true)}
                  className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleVerification(task.id, false)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}