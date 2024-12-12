import React from 'react';
import { Gift, Share2, Users } from 'lucide-react';
import { useTelegram } from '../providers/TelegramProvider';
import { ReferralCard } from '../components/referral/ReferralCard';
import { ReferralList } from '../components/referral/ReferralList';
import { toast } from 'react-hot-toast';

export function Referral() {
  const { user } = useTelegram();
  const referralLink = `https://t.me/NotImpactCoin_Bot?start=${user?.username || ''}`;

  // Get referrals from localStorage
  const getReferrals = () => {
    try {
      const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
      return Object.entries(referrals)
        .filter(([_, ref]: [string, any]) => ref.referredBy === user?.username)
        .map(([userId, ref]: [string, any]) => ({
          username: ref.username || 'Anonymous',
          joinedAt: new Date(ref.timestamp).toISOString(),
          coinsEarned: 500, // Referrer reward amount
        }));
    } catch {
      return [];
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto space-y-6">
      <ReferralCard
        icon={Gift}
        title="Referral Rewards"
        description="Earn 500 coins for each friend who joins! They get 1000 coins too!"
      >
        <button
          onClick={copyLink}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Referral Link</span>
        </button>
      </ReferralCard>

      <ReferralCard
        icon={Users}
        title="Your Referrals"
        description="Track your referral earnings"
      >
        <ReferralList referrals={getReferrals()} />
      </ReferralCard>
    </div>
  );
}