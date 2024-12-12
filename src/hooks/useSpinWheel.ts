import { useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useSpinWheelStore } from '../store/useSpinWheelStore';
import { toast } from 'react-hot-toast';
import { PAID_SPIN_COST, segments } from '../constants/spinWheel';

interface UseSpinWheelProps {
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
}

export function useSpinWheel({ 
  isSpinning, 
  setIsSpinning, 
  rotation, 
  setRotation 
}: UseSpinWheelProps) {
  const { coins, updateCoins } = useGameStore();
  const { useFreeSpin, addSpinResult } = useSpinWheelStore();

  const handleSpin = useCallback(async (isFreeSpinAttempt: boolean) => {
    if (isSpinning) return;
    
    if (isFreeSpinAttempt) {
      const freeSpinUsed = useFreeSpin();
      if (!freeSpinUsed) {
        toast.error('No free spins available!');
        return;
      }
    } else {
      if (coins < PAID_SPIN_COST) {
        toast.error('Not enough coins!');
        return;
      }
      updateCoins(-PAID_SPIN_COST, 'Spin wheel cost');
    }
    
    setIsSpinning(true);
    const newRotation = rotation + 1440 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      const segment = segments[Math.floor(Math.random() * segments.length)];
      updateCoins(segment.value, 'Spin wheel reward');
      
      addSpinResult({
        timestamp: Date.now(),
        reward: segment.value,
        isFree: isFreeSpinAttempt,
      });
      
      toast.success(`You won ${segment.value} coins!`);
      setIsSpinning(false);
    }, 3000);
  }, [isSpinning, coins, rotation, setIsSpinning, setRotation, updateCoins, useFreeSpin, addSpinResult]);

  return { handleSpin };
}