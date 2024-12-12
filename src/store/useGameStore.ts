import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sendDataToBot } from '../utils/telegram';
import { migrations } from './migrations';
import type { GameState, Transaction } from './types';

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 1000,
      clickPower: 1,
      lastClick: 0,
      lastDaily: null,
      transactions: [],

      updateCoins: (amount: number, description?: string) => {
        set((state) => {
          const newCoins = Math.max(0, state.coins + amount);
          const newTransaction: Transaction = {
            type: amount > 0 ? 'earn' : 'spend',
            amount: Math.abs(amount),
            description: description || (amount > 0 ? 'Earned coins' : 'Spent coins'),
            timestamp: Date.now(),
          };
          
          // Send score update to bot every 100 coins
          if (Math.abs(amount) >= 100) {
            sendDataToBot({ score: newCoins });
          }
          
          return { 
            coins: newCoins,
            transactions: [newTransaction, ...state.transactions].slice(0, 50) // Keep last 50 transactions
          };
        });
      },

      incrementCoins: () => {
        const now = Date.now();
        set((state) => {
          if (now - state.lastClick < 50) return state; // Anti-spam protection
          return {
            coins: state.coins + state.clickPower,
            lastClick: now,
          };
        });
      },

      claimDaily: () => {
        const now = Date.now();
        const state = get();
        
        if (!state.lastDaily || now - state.lastDaily >= 86400000) {
          set({
            coins: state.coins + 1000,
            lastDaily: now,
            transactions: [{
              type: 'earn',
              amount: 1000,
              description: 'Daily bonus',
              timestamp: now
            }, ...state.transactions].slice(0, 50)
          });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'game-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        let state = persistedState;
        
        // Apply each migration sequentially
        for (let i = version; i < 2; i++) {
          if (migrations[i]) {
            state = migrations[i](state);
          }
        }
        
        return state;
      },
    }
  )
);