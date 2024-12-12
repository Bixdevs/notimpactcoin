import React from 'react';
import { PlotCard } from './PlotCard';
import { useFarmStore } from '../../store/useFarmStore';
import { useFarmActions } from '../../hooks/useFarmActions';
import { useGameStore } from '../../store/useGameStore';
import { SEED_COST } from '../../constants/farm';

export function PlotGrid() {
  const { plots } = useFarmStore();
  const { coins } = useGameStore();
  const { handlePlant, handleHarvest } = useFarmActions();

  return (
    <div className="grid grid-cols-2 gap-4">
      {plots.map((plot, index) => (
        <PlotCard
          key={index}
          plot={plot}
          index={index}
          onPlant={handlePlant}
          onHarvest={handleHarvest}
          canPlant={coins >= SEED_COST}
        />
      ))}
    </div>
  );
}