import WebApp from '@twa-dev/sdk';
import type { TelegramUser } from '../../types/telegram';

export const getTelegramUser = (): TelegramUser | null => {
  return WebApp.initDataUnsafe?.user || null;
};