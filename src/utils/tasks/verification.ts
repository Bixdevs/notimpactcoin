import { Task, TaskType } from '../../types/tasks';
import { TASK_TYPES } from '../../constants/tasks';
import { getTelegramUser } from '../telegram';
import { rateLimiter } from '../rateLimiter';

interface VerificationResult {
  success: boolean;
  message: string;
}

export const verifyTask = async (task: Task): Promise<VerificationResult> => {
  // Rate limiting for task verification
  if (!rateLimiter.canMakeRequest(`task-${task.id}`, 60000)) {
    return {
      success: false,
      message: 'Please wait before trying again',
    };
  }

  const user = getTelegramUser();
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated',
    };
  }

  switch (task.type) {
    case TASK_TYPES.DAILY:
      return verifyDailyTask(task);
    case TASK_TYPES.SOCIAL:
      return verifySocialTask(task);
    case TASK_TYPES.ACHIEVEMENT:
      return verifyAchievementTask(task);
    default:
      return {
        success: false,
        message: 'Invalid task type',
      };
  }
};

const verifyDailyTask = async (task: Task): Promise<VerificationResult> => {
  const lastCompletion = localStorage.getItem(`daily-${task.id}`);
  const now = new Date();
  const today = now.toDateString();

  if (lastCompletion === today) {
    return {
      success: false,
      message: 'Task already completed today',
    };
  }

  localStorage.setItem(`daily-${task.id}`, today);
  return {
    success: true,
    message: 'Daily task completed',
  };
};

const verifySocialTask = async (task: Task): Promise<VerificationResult> => {
  if (!task.platform) {
    return {
      success: false,
      message: 'Invalid social platform',
    };
  }

  // Verify social actions based on platform
  try {
    const verified = await verifySocialAction(task.platform, task.completionCriteria?.action);
    return {
      success: verified,
      message: verified ? 'Social task verified' : 'Could not verify social action',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error verifying social task',
    };
  }
};

const verifyAchievementTask = async (task: Task): Promise<VerificationResult> => {
  if (!task.completionCriteria) {
    return {
      success: false,
      message: 'No completion criteria specified',
    };
  }

  const { progress, target } = task.completionCriteria;
  
  return {
    success: progress >= target,
    message: progress >= target ? 'Achievement completed' : 'Achievement not yet completed',
  };
};

const verifySocialAction = async (platform: string, action?: string): Promise<boolean> => {
  // Implement platform-specific verification logic
  switch (platform) {
    case 'telegram':
      return verifyTelegramAction(action);
    case 'twitter':
      return verifyTwitterAction(action);
    case 'discord':
      return verifyDiscordAction(action);
    default:
      return false;
  }
};