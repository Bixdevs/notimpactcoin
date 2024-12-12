import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, User } from 'lucide-react';
import { useTelegramUser } from '../../hooks/useTelegramUser';
import { useGameStore } from '../../store/useGameStore';

export function Header() {
  const navigate = useNavigate();
  const user = useTelegramUser();
  const coins = useGameStore((state) => state.coins);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">{user?.first_name}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
          <Coins className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">
            {coins.toLocaleString()}
          </span>
        </div>
      </div>
    </header>
  );
}