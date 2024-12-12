import { useGameStore } from '../store/useGameStore';
import { getTelegramUser } from './telegram';

const REFERRAL_REWARD = 1000;
const REFERRER_REWARD = 500;

export const processReferralReward = async (referralCode: string) => {
  const user = getTelegramUser();
  if (!user) return false;

  try {
    // Store referral in localStorage for demo
    const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
    
    // Prevent self-referral
    if (referralCode === user.username) return false;
    
    // Check if user was already referred
    if (referrals[user.id]) return false;
    
    // Update referral record
    referrals[user.id] = {
      referredBy: referralCode,
      timestamp: Date.now(),
      rewarded: true
    };
    
    localStorage.setItem('referrals', JSON.stringify(referrals));
    
    // Reward both users
    const gameStore = useGameStore.getState();
    
    // Reward new user
    gameStore.updateCoins(REFERRAL_REWARD, 'Welcome bonus from referral');
    
    // Reward referrer
    gameStore.updateCoins(REFERRER_REWARD, `Referral reward from @${user.username}`);
    
    return true;
  } catch (error) {
    console.error('Error processing referral:', error);
    return false;
  }
};