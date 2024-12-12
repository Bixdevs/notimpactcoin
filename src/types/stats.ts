export interface GameStats {
  totalPlayers: number;
  totalCoins: number;
  activeTasks: number;
  dailyActive: number;
}

export interface LeaderboardEntry {
  userId: number;
  username: string;
  coins: number;
  level: number;
  tasksCompleted: number;
}

export interface GlobalStats extends GameStats {
  totalTransactions: number;
  averageCoinsPerUser: number;
  taskCompletionRate: number;
}