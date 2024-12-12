import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { toast } from 'react-hot-toast';

export function CoinFlip() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [bet, setBet] = useState(50);
  const { coins, updateCoins } = useGameStore();

  const handleFlip = (choice: 'heads' | 'tails') => {
    if (isFlipping || coins < bet) return;

    setIsFlipping(true);
    updateCoins(-bet);

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const newRotation = rotation + (result === 'heads' ? 1080 : 1260);
    setRotation(newRotation);

    setTimeout(() => {
      const won = choice === result;
      const winAmount = won ? bet * 2 : 0;
      
      if (won) {
        updateCoins(winAmount);
        toast.success(`You won ${winAmount} coins!`);
      } else {
        toast.error('Better luck next time!');
      }
      
      setIsFlipping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-orange-500 flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40 mb-8">
        <motion.div
          className="w-full h-full rounded-full bg-yellow-400 border-4 border-yellow-300 shadow-xl flex items-center justify-center"
          animate={{ rotateX: rotation }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Coins className="w-16 h-16 text-yellow-600" />
        </motion.div>
      </div>

      <div className="mb-8">
        <label className="block text-white text-center mb-2">Bet Amount</label>
        <input
          type="range"
          min="50"
          max={Math.min(1000, coins)}
          step="50"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          className="w-48"
          disabled={isFlipping}
        />
        <div className="text-white text-center mt-1">{bet} coins</div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleFlip('heads')}
          disabled={isFlipping || coins < bet}
          className={`px-6 py-3 rounded-full font-bold text-lg
            ${isFlipping || coins < bet
              ? 'bg-gray-500'
              : 'bg-white text-yellow-500 hover:bg-yellow-100'
            } transition-all duration-200`}
        >
          Heads
        </button>
        <button
          onClick={() => handleFlip('tails')}
          disabled={isFlipping || coins < bet}
          className={`px-6 py-3 rounded-full font-bold text-lg
            ${isFlipping || coins < bet
              ? 'bg-gray-500'
              : 'bg-white text-yellow-500 hover:bg-yellow-100'
            } transition-all duration-200`}
        >
          Tails
        </button>
      </div>

      {coins < bet && (
        <p className="mt-4 text-white/80">
          Not enough coins! You need at least {bet} coins to play.
        </p>
      )}
    </div>
  );
}