// Add to existing types
export interface SpinWheelState {
  freeSpins: number;
  lastFreeSpin: number | null;
  spinHistory: SpinResult[];
}

export interface SpinResult {
  timestamp: number;
  reward: number;
  isFree: boolean;
}