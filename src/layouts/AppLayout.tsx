import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isGameScreen = location.pathname.startsWith('/games/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600">
      {!isGameScreen && <Header />}
      <main className="pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}