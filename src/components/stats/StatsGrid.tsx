import React from 'react';
import { Trophy, Users, Coins, TrendingUp } from 'lucide-react';
import type { GameStats } from '../../types/stats';

interface StatsGridProps {
  stats: GameStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      icon: Users,
      label: 'Total Players',
      value: stats.totalPlayers,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Coins,
      label: 'Total Coins',
      value: stats.totalCoins.toLocaleString(),
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Trophy,
      label: 'Active Tasks',
      value: stats.activeTasks,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Daily Active',
      value: stats.dailyActive,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`bg-gradient-to-br ${item.color} p-4 rounded-lg text-white`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/80">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}