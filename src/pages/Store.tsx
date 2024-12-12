import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Zap, Crown, Palette } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function Store() {
  const { coins, updateCoins } = useGameStore();

  const items = [
    {
      id: 'boost',
      name: 'Click Booster',
      description: '2x clicks for 1 hour',
      price: 1000,
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'premium',
      name: 'Premium Status',
      description: 'Special badge and benefits',
      price: 5000,
      icon: Crown,
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'theme',
      name: 'Custom Theme',
      description: 'Unlock custom app themes',
      price: 2500,
      icon: Palette,
      color: 'from-blue-400 to-cyan-500',
    },
  ];

  const handlePurchase = (item: typeof items[0]) => {
    if (coins < item.price) {
      toast.error('Not enough coins!');
      return;
    }

    updateCoins(-item.price);
    toast.success(`Successfully purchased ${item.name}!`);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Store</h1>
      
      <div className="grid gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{item.name}</h3>
              <p className="text-white/80 text-sm mb-3">{item.description}</p>
              <button
                onClick={() => handlePurchase(item)}
                disabled={coins < item.price}
                className={`w-full py-2 rounded-lg font-medium ${
                  coins < item.price
                    ? 'bg-gray-500 text-white/60'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600'
                }`}
              >
                {item.price.toLocaleString()} coins
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}