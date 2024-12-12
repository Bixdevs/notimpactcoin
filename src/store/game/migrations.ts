import type { GameState } from '../types';

export const migrations = {
  0: (state: GameState) => ({
    ...state,
    coins: state.coins || 1000,
    clickPower: state.clickPower || 1,
    lastClick: state.lastClick || 0,
    lastDaily: state.lastDaily || null,
    transactions: state.transactions || [],
  }),
  1: (state: GameState) => ({
    ...state,
    transactions: state.transactions || [],
  }),
};