import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTelegramUser } from '../../utils/telegram';
import { useGameStore } from '../useGameStore';
import { useTaskStore } from '../tasks/useTaskStore';
import { TASK_TYPES, TASK_STATUS } from '../../constants/tasks';

interface AdminState {
  isAdmin: boolean;
  checkAdminStatus: () => boolean;
  adminActions: {
    // User Management
    addCoins: (userId: number, amount: number) => void;
    removeCoins: (userId: number, amount: number) => void;
    banUser: (userId: number) => void;
    unbanUser: (userId: number) => void;
    
    // Task Management
    createTask: (taskData: any) => void;
    removeTask: (taskId: string) => void;
    updateTask: (taskId: string, updates: Partial<any>) => void;
    
    // Game Management
    resetUserProgress: (userId: number) => void;
    setFreeSpin: (userId: number, amount: number) => void;
    
    // Task Verification
    approveTask: (taskId: string) => void;
    rejectTask: (taskId: string) => void;
  };
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,

      checkAdminStatus: () => {
        const user = getTelegramUser();
        const isAdmin = user?.username === 'Bixdevs';
        set({ isAdmin });
        return isAdmin;
      },

      adminActions: {
        addCoins: (userId, amount) => {
          if (!get().isAdmin) return;
          const gameStore = useGameStore.getState();
          gameStore.updateCoins(amount, 'Admin added coins');
        },

        removeCoins: (userId, amount) => {
          if (!get().isAdmin) return;
          const gameStore = useGameStore.getState();
          gameStore.updateCoins(-amount, 'Admin removed coins');
        },

        createTask: (taskData) => {
          if (!get().isAdmin) return;
          const taskStore = useTaskStore.getState();
          const newTask = {
            ...taskData,
            id: crypto.randomUUID(),
            status: TASK_STATUS.PENDING,
          };
          taskStore.addTask(newTask);
        },

        removeTask: (taskId) => {
          if (!get().isAdmin) return;
          const taskStore = useTaskStore.getState();
          taskStore.removeTask(taskId);
        },

        updateTask: (taskId, updates) => {
          if (!get().isAdmin) return;
          const taskStore = useTaskStore.getState();
          taskStore.updateTask(taskId, updates);
        },

        approveTask: (taskId) => {
          if (!get().isAdmin) return;
          const taskStore = useTaskStore.getState();
          const gameStore = useGameStore.getState();
          const task = taskStore.tasks.find(t => t.id === taskId);
          
          if (task) {
            taskStore.updateTaskStatus(taskId, TASK_STATUS.CLAIMED);
            gameStore.updateCoins(task.reward, `Task reward: ${task.title}`);
          }
        },

        rejectTask: (taskId) => {
          if (!get().isAdmin) return;
          const taskStore = useTaskStore.getState();
          const gameStore = useGameStore.getState();
          const task = taskStore.tasks.find(t => t.id === taskId);
          
          if (task) {
            taskStore.updateTaskStatus(taskId, TASK_STATUS.PENDING);
            const penalty = Math.floor(task.reward * 0.1); // 10% penalty
            if (penalty > 0) {
              gameStore.updateCoins(-penalty, 'Task rejection penalty');
            }
          }
        },

        resetUserProgress: (userId) => {
          if (!get().isAdmin) return;
          const gameStore = useGameStore.getState();
          gameStore.resetProgress();
        },

        setFreeSpin: (userId, amount) => {
          if (!get().isAdmin) return;
          // Implement setFreeSpin logic
        },
      },
    }),
    {
      name: 'admin-storage',
      version: 2,
    }
  )
);