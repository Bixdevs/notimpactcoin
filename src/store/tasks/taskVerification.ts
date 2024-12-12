import { Task } from '../../types/tasks';
import { verifyTask } from '../../utils/tasks/verification';
import { useGameStore } from '../useGameStore';
import { TASK_STATUS } from '../../constants/tasks';

export const verifyAndCompleteTask = async (
  task: Task,
  updateTaskStatus: (taskId: string, status: string) => void
): Promise<boolean> => {
  const result = await verifyTask(task);
  
  if (result.success) {
    updateTaskStatus(task.id, TASK_STATUS.COMPLETED);
    return true;
  }
  
  return false;
};

export const claimTaskReward = (
  task: Task,
  updateTaskStatus: (taskId: string, status: string) => void
): void => {
  const gameStore = useGameStore.getState();
  
  if (task.status === TASK_STATUS.COMPLETED) {
    gameStore.updateCoins(task.reward, `Completed task: ${task.title}`);
    updateTaskStatus(task.id, TASK_STATUS.CLAIMED);
  }
};