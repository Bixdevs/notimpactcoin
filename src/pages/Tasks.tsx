import React from 'react';
import { Calendar, Share2, Trophy } from 'lucide-react';
import { useTaskStore } from '../store/tasks/useTaskStore';
import { TASK_TYPES } from '../constants/tasks';
import { useGameStore } from '../store/useGameStore';
import { TaskSection } from '../components/tasks/TaskSection';
import { toast } from 'react-hot-toast';

export function Tasks() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const { updateCoins } = useGameStore();

  const sections = [
    {
      title: 'Daily Tasks',
      icon: Calendar,
      tasks: tasks.filter(task => task.type === TASK_TYPES.DAILY),
    },
    {
      title: 'Social Tasks',
      icon: Share2,
      tasks: tasks.filter(task => task.type === TASK_TYPES.SOCIAL),
    },
    {
      title: 'Achievements',
      icon: Trophy,
      tasks: tasks.filter(task => task.type === TASK_TYPES.ACHIEVEMENT),
    },
  ];

  const handleClaim = (taskId: string, reward: number) => {
    updateTaskStatus(taskId, TASK_STATUS.CLAIMED);
    updateCoins(reward, 'Task reward');
    toast.success(`Claimed ${reward} coins!`);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {sections.map(({ title, icon, tasks }) => (
        <TaskSection
          key={title}
          title={title}
          icon={icon}
          tasks={tasks}
          onClaim={handleClaim}
        />
      ))}
    </div>
  );
}