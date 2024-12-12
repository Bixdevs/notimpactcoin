import React, { useState } from 'react';
import { ListTodo, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import { useTaskStore } from '../../store/tasks/useTaskStore';
import { useAdminStore } from '../../store/admin/useAdminStore';
import { TASK_TYPES } from '../../constants/tasks';
import { toast } from 'react-hot-toast';
import { Task } from '../../types/tasks';

export function AdminTaskManager() {
  const [newTask, setNewTask] = useState({
    type: TASK_TYPES.DAILY,
    title: '',
    description: '',
    reward: 100,
    link: '',
    completionCriteria: {
      action: '',
      target: 1,
      progress: 0
    }
  });

  const { tasks } = useTaskStore();
  const { adminActions } = useAdminStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.title || !newTask.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      adminActions.createTask({
        type: newTask.type,
        title: newTask.title,
        description: newTask.description,
        reward: newTask.reward,
        link: newTask.link || undefined,
        completionCriteria: newTask.completionCriteria.action ? newTask.completionCriteria : undefined
      });

      toast.success('Task created successfully!');
      
      // Reset form
      setNewTask({
        type: TASK_TYPES.DAILY,
        title: '',
        description: '',
        reward: 100,
        link: '',
        completionCriteria: {
          action: '',
          target: 1,
          progress: 0
        }
      });
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = (taskId: string) => {
    try {
      adminActions.removeTask(taskId);
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <ListTodo className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Task Manager</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Task Type
          </label>
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value as keyof typeof TASK_TYPES })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            {Object.values(TASK_TYPES).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Task title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Link URL (Optional)
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="url"
                value={newTask.link}
                onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white"
                placeholder="https://example.com"
              />
              <LinkIcon className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Description *
          </label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Task description"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Reward (coins)
          </label>
          <input
            type="number"
            value={newTask.reward}
            onChange={(e) => setNewTask({ ...newTask, reward: Number(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Completion Action (Optional)
          </label>
          <input
            type="text"
            value={newTask.completionCriteria.action}
            onChange={(e) => setNewTask({
              ...newTask,
              completionCriteria: {
                ...newTask.completionCriteria,
                action: e.target.value
              }
            })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="e.g., join_channel, share_bot"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Active Tasks</h3>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-white">
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
                </h4>
              </div>
              <p className="text-sm text-white/70">{task.description}</p>
              <span className="text-xs text-purple-400">{task.type}</span>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}