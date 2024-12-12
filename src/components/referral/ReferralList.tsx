import React from 'react';
import { Users } from 'lucide-react';

interface Referral {
  username: string;
  joinedAt: string;
  coinsEarned: number;
}

interface ReferralListProps {
  referrals: Referral[];
}

export function ReferralList({ referrals }: ReferralListProps) {
  if (referrals.length === 0) {
    return (
      <div className="text-center py-8 text-white/60">
        <p>No referrals yet</p>
        <p className="text-sm">Share your link to start earning!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {referrals.map((referral, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">@{referral.username}</p>
              <p className="text-sm text-white/60">
                Joined {new Date(referral.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <span className="text-green-400 font-medium">
            +{referral.coinsEarned} coins
          </span>
        </div>
      ))}
    </div>
  );
}