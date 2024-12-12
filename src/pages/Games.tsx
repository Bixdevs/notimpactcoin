import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices, Coins, Timer, Gamepad2 } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';

export function Games() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'spin-wheel',
      title: 'Lucky Spin',
      description: 'Spin the wheel to win big rewards!',
      icon: Dices,
      color: 'from-purple-500 to-pink-500',
      minBet: 100,
    },
    {
      id: 'coin-flip',
      title: 'Coin Flip',
      description: 'Double your coins with a lucky flip!',
      icon: Coins,
      color: 'from-yellow-500 to-orange-500',
      minBet: 50,
    },
    {
      id: 'farm',
      title: 'Coin Farm',
      description: 'Plant coins and harvest more!',
      icon: Timer,
      color: 'from-green-500 to-emerald-500',
      minBet: 0,
    },
    {
      id: 'clicker',
      title: 'Super Clicker',
      description: 'Click faster to earn more!',
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500',
      minBet: 0,
    },
  ];

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => navigate(`/games/${game.id}`)}
          />
        ))}
      </div>
    </div>
  );
}