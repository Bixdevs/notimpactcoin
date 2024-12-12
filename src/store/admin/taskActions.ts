import { useGameStore } from '../useGameStore';
import { useTaskStore } from '../tasks/useTaskStore';
import { TASK_STATUS } from '../../constants/tasks';
import { getTelegramUser } from '../../utils/telegram';

export const createTaskActions = (isAdmin: boolean) => ({
  approveTask: (taskId: string) => {
    if (!isAdmin) return;
    
    const taskStore = useTaskStore.getState();
    const gameStore = useGameStore.getState();
    const task = taskStore.tasks.find(t => t.id === taskId);
    
    if (task) {
      // Update task status
      taskStore.updateTaskStatus(taskId, TASK_STATUS.CLAIMED);
      
      // Grant reward
      gameStore.updateCoins(task.reward, `Task reward: ${task.title}`);
      
      // Send notification to user via bot
      const user = getTelegramUser();
      if (user) {
        // Implement bot notification
      }
    }
  },

  rejectTask: (taskId: string) => {
    if (!isAdmin) return;
    
    const taskStore = useTaskStore.getState();
    const gameStore = useGameStore.getState();
    const task = taskStore.tasks.find(t => t.id === taskId);
    
    if (task) {
      // Reset task status
      taskStore.updateTaskStatus(taskId, TASK_STATUS.PENDING);
      
      // Apply penalty if configured
      const penalty = Math.floor(task.reward * 0.1); // 10% penalty
      if (penalty > 0) {
        gameStore.updateCoins(-penalty, `Task rejection penalty`);
      }
      
      // Send notification to user
      const user = getTelegramUser();
      if (user) {
        // Implement bot notification
      }
    }
  },
});