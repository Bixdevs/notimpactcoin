import React from 'react';
import { Trophy, Users, Coins, TrendingUp } from 'lucide-react';
import { StatsGrid } from '../components/stats/StatsGrid';
import { Leaderboard } from '../components/leaderboard/Leaderboard';
import { useGameStats } from '../hooks/useGameStats';

export function Home() {
  const { stats, leaderboard } = useGameStats();

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white">
          NotImpactCoin
        </h1>
        <p className="text-white/90">
          Compete, earn, and climb the leaderboard!
        </p>
      </div>

      <StatsGrid stats={stats} />
      <Leaderboard data={leaderboard} />
    </div>
  );
}