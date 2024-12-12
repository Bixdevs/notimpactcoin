import React, { createContext, useEffect, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { useTelegramUser } from '../hooks/useTelegramUser';

interface TelegramContextType {
  user: ReturnType<typeof useTelegramUser>;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const user = useTelegramUser();

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <TelegramContext.Provider value={{ user }}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};