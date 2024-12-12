import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '../../types/stats';
import { LeaderboardRow } from './LeaderboardRow';

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

export function Leaderboard({ data }: LeaderboardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Top Players</h2>
      </div>

      <div className="space-y-4">
        {data.map((entry, index) => (
          <LeaderboardRow
            key={entry.userId}
            rank={index + 1}
            entry={entry}
          />
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No players yet. Start playing to appear on the leaderboard!
          </div>
        )}
      </div>
    </div>
  );
}