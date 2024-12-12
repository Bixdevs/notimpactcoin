import React from 'react';
import { Coins } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { sendDataToBot } from '../utils/telegram';

export function CoinButton() {
  const { incrementCoins, coins } = useGameStore();

  const handleClick = async () => {
    incrementCoins();
    // Send updated score to bot every 100 coins
    if (coins % 100 === 0) {
      await sendDataToBot({ score: coins });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-32 h-32 bg-yellow-400 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
    >
      <Coins className="w-16 h-16 text-yellow-600" />
    </button>
  );
}