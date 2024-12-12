import React from 'react';
import { Clock } from 'lucide-react';
import { PAID_SPIN_COST } from '../../constants/spinWheel';
import { useSpinTimer } from '../../hooks/useSpinTimer';

interface SpinButtonsProps {
  isSpinning: boolean;
  freeSpins: number;
  coins: number;
  onSpin: (isFree: boolean) => void;
}

export function SpinButtons({ isSpinning, freeSpins, coins, onSpin }: SpinButtonsProps) {
  const nextFreeSpinTime = useSpinTimer();

  return (
    <div className="mt-8 space-y-4">
      {freeSpins > 0 ? (
        <button
          onClick={() => onSpin(true)}
          disabled={isSpinning}
          className={`w-full px-8 py-4 rounded-full text-white font-bold text-lg
            ${isSpinning 
              ? 'bg-gray-500' 
              : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'
            } transition-all duration-200`}
        >
          {isSpinning ? 'Spinning...' : `Use Free Spin`}
        </button>
      ) : nextFreeSpinTime && (
        <div className="text-center text-white/80 flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Next free spin {nextFreeSpinTime}</span>
        </div>
      )}

      <button
        onClick={() => onSpin(false)}
        disabled={isSpinning || coins < PAID_SPIN_COST}
        className={`w-full px-8 py-4 rounded-full text-white font-bold text-lg
          ${isSpinning || coins < PAID_SPIN_COST
            ? 'bg-gray-500' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
          } transition-all duration-200`}
      >
        {isSpinning ? 'Spinning...' : `Paid Spin (${PAID_SPIN_COST} coins)`}
      </button>
    </div>
  );
}