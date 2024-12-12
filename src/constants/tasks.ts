export const TASK_TYPES = {
  DAILY: 'daily',
  SOCIAL: 'social',
  ACHIEVEMENT: 'achievement',
} as const;

export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CLAIMED: 'claimed',
} as const;

export const SOCIAL_PLATFORMS = {
  TELEGRAM: 'telegram',
  TWITTER: 'twitter',
  DISCORD: 'discord',
} as const;

export const DAILY_REWARDS = {
  1: 100,   // Day 1
  2: 150,   // Day 2
  3: 200,   // Day 3
  4: 250,   // Day 4
  5: 300,   // Day 5
  6: 350,   // Day 6
  7: 1000,  // Day 7 (Weekly bonus)
} as const;