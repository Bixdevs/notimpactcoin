import { Transaction } from '../../types/transactions';
import { sendDataToBot } from '../../utils/telegram';
import { MIN_SCORE_UPDATE } from '../../constants/game';

export const createTransaction = (
  amount: number,
  description?: string
): Transaction => ({
  type: amount > 0 ? 'earn' : 'spend',
  amount: Math.abs(amount),
  description: description || (amount > 0 ? 'Earned coins' : 'Spent coins'),
  timestamp: Date.now(),
});

export const handleScoreUpdate = (coins: number) => {
  if (Math.abs(coins) >= MIN_SCORE_UPDATE) {
    sendDataToBot({ score: coins });
  }
};