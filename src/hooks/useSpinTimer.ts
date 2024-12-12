import { useState, useEffect } from 'react';
import { formatDistanceToNow, addMilliseconds } from 'date-fns';
import { useSpinWheelStore } from '../store/useSpinWheelStore';
import { FREE_SPIN_COOLDOWN } from '../constants/spinWheel';

export function useSpinTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const { lastFreeSpin, checkFreeSpins } = useSpinWheelStore();

  useEffect(() => {
    const updateTimer = () => {
      if (!lastFreeSpin) {
        setTimeLeft('');
        return;
      }

      const now = Date.now();
      const nextSpinTime = addMilliseconds(lastFreeSpin, FREE_SPIN_COOLDOWN);
      
      if (now >= nextSpinTime) {
        checkFreeSpins();
        setTimeLeft('');
      } else {
        setTimeLeft(formatDistanceToNow(nextSpinTime, { addSuffix: true }));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lastFreeSpin, checkFreeSpins]);

  return timeLeft;
}