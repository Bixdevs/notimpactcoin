import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { useClickerStore } from '../../store/useClickerStore';
import { toast } from 'react-hot-toast';

export function Clicker() {
  const [combo, setCombo] = useState(0);
  const { coins, updateCoins } = useGameStore();
  const { clickPower, upgrades, purchaseUpgrade } = useClickerStore();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCombo(0);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    const newCombo = Math.min(combo + 1, 10);
    setCombo(newCombo);
    
    const bonus = Math.floor(newCombo / 2);
    const earned = clickPower + bonus;
    
    updateCoins(earned);
    
    if (newCombo === 10) {
      toast.success('Perfect combo! +5 bonus coins!');
      updateCoins(5);
    }
  };

  const handleUpgrade = (id: string, cost: number) => {
    if (coins < cost) return;
    
    updateCoins(-cost);
    purchaseUpgrade(id);
    toast.success('Upgrade purchased!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-cyan-500 p-4">
      <div className="max-w-md mx-auto pt-20 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white">Click Power: {clickPower}</h2>
          <div className="mt-2 flex space-x-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < combo ? 'bg-yellow-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg flex items-center justify-center mb-8"
        >
          <Coins className="w-20 h-20 text-yellow-100" />
        </motion.button>

        <div className="w-full space-y-4">
          {upgrades.map((upgrade) => (
            <button
              key={upgrade.id}
              onClick={() => handleUpgrade(upgrade.id, upgrade.cost)}
              disabled={coins < upgrade.cost || upgrade.purchased}
              className={`w-full p-4 rounded-lg text-left ${
                upgrade.purchased
                  ? 'bg-green-500 text-white'
                  : coins < upgrade.cost
                  ? 'bg-gray-500 text-white/60'
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{upgrade.name}</h3>
                  <p className="text-sm opacity-80">{upgrade.description}</p>
                </div>
                {!upgrade.purchased && (
                  <span className="font-bold">{upgrade.cost} coins</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}