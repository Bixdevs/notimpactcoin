import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ReferralCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function ReferralCard({ icon: Icon, title, description, children }: ReferralCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}