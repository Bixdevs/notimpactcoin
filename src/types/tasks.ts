import { TASK_TYPES, TASK_STATUS, SOCIAL_PLATFORMS } from '../constants/tasks';

export type TaskType = typeof TASK_TYPES[keyof typeof TASK_TYPES];
export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];
export type SocialPlatform = typeof SOCIAL_PLATFORMS[keyof typeof SOCIAL_PLATFORMS];

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  reward: number;
  status: TaskStatus;
  link?: string;
  completionCriteria?: {
    action: string;
    target: number;
    progress: number;
  };
  expiresAt?: number;
  platform?: SocialPlatform;
}

export interface DailyLoginStreak {
  currentStreak: number;
  lastLoginDate: string;
  totalLogins: number;
}