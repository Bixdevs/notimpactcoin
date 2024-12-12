import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameProps {
  game: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    minBet: number;
  };
  onClick: () => void;
}

export function GameCard({ game, onClick }: GameProps) {
  const Icon = game.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-6 rounded-xl bg-gradient-to-br ${game.color} text-white shadow-lg`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-white/10 rounded-lg">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-xl font-bold">{game.title}</h3>
          <p className="text-white/80 text-sm mt-1">{game.description}</p>
          {game.minBet > 0 && (
            <div className="mt-2 text-xs bg-black/20 inline-block px-2 py-1 rounded">
              Min bet: {game.minBet} coins
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}