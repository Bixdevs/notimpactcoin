import { useState, useEffect } from 'react';
import type { GameStats, LeaderboardEntry } from '../types/stats';
import { getTelegramUser } from '../utils/telegram';

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>({
    totalPlayers: 0,
    totalCoins: 0,
    activeTasks: 0,
    dailyActive: 0,
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchStats = () => {
      try {
        // Get users data from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Calculate stats
        const totalPlayers = Object.keys(users).length;
        const totalCoins = Object.values(users).reduce((sum: number, user: any) => sum + (user.coins || 0), 0);
        const activeTasks = tasks.filter((task: any) => !task.completed).length;
        
        // Get daily active users (users who played in last 24h)
        const now = Date.now();
        const dailyActive = Object.values(users).filter((user: any) => 
          now - (user.lastActive || 0) < 24 * 60 * 60 * 1000
        ).length;

        setStats({
          totalPlayers,
          totalCoins,
          activeTasks,
          dailyActive,
        });

        // Create leaderboard
        const leaderboardData = Object.entries(users)
          .map(([userId, data]: [string, any]) => ({
            userId: parseInt(userId),
            username: data.username || 'Anonymous',
            coins: data.coins || 0,
            level: Math.floor((data.coins || 0) / 1000) + 1,
            tasksCompleted: data.tasksCompleted || 0,
          }))
          .sort((a, b) => b.coins - a.coins)
          .slice(0, 10);

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching game stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { stats, leaderboard };
}