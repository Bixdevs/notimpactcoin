import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Sprout } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Plot } from '../../types/farm';

interface PlotCardProps {
  plot: Plot;
  index: number;
  onPlant: (index: number) => void;
  onHarvest: (index: number) => void;
  canPlant: boolean;
}

export function PlotCard({ plot, index, onPlant, onHarvest, canPlant }: PlotCardProps) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="aspect-square rounded-lg bg-gradient-to-b from-green-600/50 to-green-800/50 flex flex-col items-center justify-center">
        {plot.growing ? (
          <>
            <Sprout className="w-12 h-12 text-green-300" />
            {plot.readyToHarvest ? (
              <button
                onClick={() => onHarvest(index)}
                className="mt-4 px-4 py-2 bg-yellow-400 rounded-full text-sm font-bold text-yellow-800"
              >
                Harvest
              </button>
            ) : (
              <div className="mt-2 text-xs text-white/90">
                Ready {formatDistanceToNow(plot.harvestTime)}
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => onPlant(index)}
            disabled={!canPlant}
            className={`flex flex-col items-center ${
              !canPlant ? 'opacity-50' : ''
            }`}
          >
            <Timer className="w-12 h-12 text-white/60" />
            <span className="mt-2 text-xs text-white/90">
              Plant (100 coins)
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
}