export const PAID_SPIN_COST = 100;
export const FREE_SPIN_COOLDOWN = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
export const MAX_FREE_SPINS = 1;

export const segments = [
  { value: 50, color: '#FF6B6B' },
  { value: 300, color: '#4ECDC4' },
  { value: 25, color: '#45B7D1' },
  { value: 75, color: '#96CEB4' },
  { value: 250, color: '#FFEEAD' },
  { value: 0, color: '#D4A5A5' },
  { value: 200, color: '#9DE0AD' },
  { value: 10, color: '#FF9999' },
] as const;