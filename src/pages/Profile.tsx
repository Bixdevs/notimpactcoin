import React from 'react';
import { useTelegram } from '../providers/TelegramProvider';
import { useGameStore } from '../store/useGameStore';
import { User, Trophy, Clock } from 'lucide-react';

export function Profile() {
  const { user } = useTelegram();
  const { coins } = useGameStore();

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.first_name}</h2>
            <p className="text-white/80">@{user?.username || 'Anonymous'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
          <h3 className="text-lg font-bold text-white">Total Coins</h3>
          <p className="text-2xl font-bold text-yellow-400">{coins.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <Clock className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-lg font-bold text-white">Member Since</h3>
          <p className="text-white/80">Today</p>
        </div>
      </div>
    </div>
  );
}