import React from 'react';
import { Medal } from 'lucide-react';
import type { LeaderboardEntry } from '../../types/stats';

interface LeaderboardRowProps {
  rank: number;
  entry: LeaderboardEntry;
}

export function LeaderboardRow({ rank, entry }: LeaderboardRowProps) {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 flex items-center justify-center ${getMedalColor(rank)}`}>
          {rank <= 3 ? (
            <Medal className="w-6 h-6" />
          ) : (
            <span className="font-bold">{rank}</span>
          )}
        </div>
        <div>
          <p className="font-medium text-white">@{entry.username}</p>
          <p className="text-sm text-white/60">Level {entry.level}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-yellow-400">{entry.coins.toLocaleString()}</p>
        <p className="text-sm text-white/60">{entry.tasksCompleted} tasks</p>
      </div>
    </div>
  );
}