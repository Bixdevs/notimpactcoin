import React from 'react';
import { useGameStore } from '../store/useGameStore';

export function Stats() {
  const coins = useGameStore((state) => state.coins);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">
        {coins.toLocaleString()} coins
      </h2>
    </div>
  );
}