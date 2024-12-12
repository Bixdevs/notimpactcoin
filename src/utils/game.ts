import { Transaction } from '../types/transactions';
import { MIN_SCORE_UPDATE } from '../constants/game';
import { sendDataToBot } from './telegram';

export const createTransaction = (
  amount: number,
  description?: string
): Transaction => ({
  type: amount > 0 ? 'earn' : 'spend',
  amount: Math.abs(amount),
  description: description || (amount > 0 ? 'Earned coins' : 'Spent coins'),
  timestamp: Date.now(),
});

export const updateScore = (coins: number) => {
  if (Math.abs(coins) >= MIN_SCORE_UPDATE) {
    sendDataToBot({ score: coins });
  }
};