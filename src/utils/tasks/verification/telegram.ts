import WebApp from '@twa-dev/sdk';
import { getTelegramUser } from '../../telegram';
import { Task } from '../../../types/tasks';

export const verifyTelegramTask = async (task: Task): Promise<boolean> => {
  const user = getTelegramUser();
  if (!user) return false;

  try {
    // Send verification request to bot
    await WebApp.sendData(JSON.stringify({
      type: 'verify_task',
      taskId: task.id,
      userId: user.id,
      username: user.username,
    }));
    
    return true;
  } catch (error) {
    console.error('Error verifying task:', error);
    return false;
  }
};