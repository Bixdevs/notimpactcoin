import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus } from '../../types/tasks';
import { TASK_TYPES, TASK_STATUS } from '../../constants/tasks';

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  getTasksByType: (type: typeof TASK_TYPES[keyof typeof TASK_TYPES]) => Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task],
      })),

      removeTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
      })),

      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        ),
      })),

      updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        ),
      })),

      updateTaskProgress: (taskId, progress) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId && task.completionCriteria
            ? {
                ...task,
                completionCriteria: {
                  ...task.completionCriteria,
                  progress,
                },
                status:
                  progress >= (task.completionCriteria.target || 0)
                    ? TASK_STATUS.COMPLETED
                    : task.status,
              }
            : task
        ),
      })),

      getTasksByType: (type) => get().tasks.filter((task) => task.type === type),
      
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: 'task-storage',
    }
  )
);