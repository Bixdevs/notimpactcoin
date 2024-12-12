import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import type { TelegramUser } from '../types/telegram';

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  return user;
}