import React from 'react';
import { History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { SpinResult } from '../../store/types';

interface SpinHistoryProps {
  history: SpinResult[];
}

export function SpinHistory({ history }: SpinHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <History className="w-5 h-5 text-white/80" />
        <h3 className="text-lg font-bold text-white">Spin History</h3>
      </div>
      
      <div className="space-y-2">
        {history.slice(0, 5).map((spin, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <span className={spin.isFree ? 'text-green-400' : 'text-white/80'}>
                {spin.isFree ? 'Free Spin' : 'Paid Spin'}
              </span>
              <span className="text-white/60">
                {formatDistanceToNow(spin.timestamp, { addSuffix: true })}
              </span>
            </div>
            <span className="font-bold text-yellow-400">
              +{spin.reward} coins
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}