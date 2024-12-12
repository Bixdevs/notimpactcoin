import WebApp from '@twa-dev/sdk';
import type { TelegramUser } from '../types/telegram';

// Rate limiting for score updates
const lastScoreUpdate = {
  timestamp: 0,
  cooldown: 5000,
};

export const getTelegramUser = (): TelegramUser | null => {
  return WebApp.initDataUnsafe?.user || null;
};

export const sendDataToBot = async (data: any) => {
  try {
    const now = Date.now();
    if (now - lastScoreUpdate.timestamp < lastScoreUpdate.cooldown) {
      console.log('Rate limited: Too many score updates');
      return;
    }
    
    lastScoreUpdate.timestamp = now;
    await WebApp.sendData(JSON.stringify(data));
  } catch (error) {
    console.error('Error sending data to bot:', error);
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};