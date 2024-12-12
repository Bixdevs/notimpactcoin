import { useGameStore } from '../store/useGameStore';
import { DAILY_BONUS_AMOUNT, DAILY_COOLDOWN } from '../constants/game';
import { createTransaction } from '../utils/game';

export const useGameActions = () => {
  const { updateCoins, lastDaily, setLastDaily } = useGameStore();

  const claimDaily = () => {
    const now = Date.now();
    
    if (!lastDaily || now - lastDaily >= DAILY_COOLDOWN) {
      updateCoins(
        DAILY_BONUS_AMOUNT,
        'Daily bonus',
        createTransaction(DAILY_BONUS_AMOUNT, 'Daily bonus')
      );
      setLastDaily(now);
      return true;
    }
    return false;
  };

  return { claimDaily };
};