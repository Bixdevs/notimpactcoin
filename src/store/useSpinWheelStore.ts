import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SpinWheelState, SpinResult } from './types';
import { FREE_SPIN_COOLDOWN, MAX_FREE_SPINS } from '../constants/spinWheel';

export const useSpinWheelStore = create<SpinWheelState>()(
  persist(
    (set, get) => ({
      freeSpins: MAX_FREE_SPINS,
      lastFreeSpin: null,
      spinHistory: [],

      checkFreeSpins: () => {
        const now = Date.now();
        const lastFreeSpin = get().lastFreeSpin;
        const currentFreeSpins = get().freeSpins;

        if (lastFreeSpin && now - lastFreeSpin >= FREE_SPIN_COOLDOWN && currentFreeSpins < MAX_FREE_SPINS) {
          set({
            freeSpins: MAX_FREE_SPINS,
            lastFreeSpin: null,
          });
        }
      },

      useFreeSpin: () => {
        const { freeSpins, lastFreeSpin } = get();
        const now = Date.now();

        // Check if enough time has passed since last free spin
        if (lastFreeSpin && now - lastFreeSpin < FREE_SPIN_COOLDOWN) {
          return false;
        }

        if (freeSpins <= 0) return false;

        set({
          freeSpins: freeSpins - 1,
          lastFreeSpin: now,
        });
        return true;
      },

      addSpinResult: (result: SpinResult) => {
        set((state) => ({
          spinHistory: [result, ...state.spinHistory].slice(0, 50), // Keep last 50 spins
        }));
      },

      getNextFreeSpinTime: () => {
        const { lastFreeSpin } = get();
        if (!lastFreeSpin) return 0;
        
        const now = Date.now();
        const timePassed = now - lastFreeSpin;
        return Math.max(0, FREE_SPIN_COOLDOWN - timePassed);
      },
    }),
    {
      name: 'spin-wheel-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          return {
            ...persistedState,
            freeSpins: MAX_FREE_SPINS,
            lastFreeSpin: null,
            spinHistory: persistedState.spinHistory || [],
          };
        }
        return persistedState;
      },
    }
  )
);