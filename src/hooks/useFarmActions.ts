import { useFarmStore } from '../store/useFarmStore';
import { useGameStore } from '../store/useGameStore';
import { SEED_COST, HARVEST_REWARD } from '../constants/farm';
import { calculateHarvestTime } from '../utils/farm';
import { toast } from 'react-hot-toast';

export const useFarmActions = () => {
  const { plots, plantSeed, harvestPlot } = useFarmStore();
  const { coins, updateCoins } = useGameStore();

  const handlePlant = (plotIndex: number) => {
    if (coins < SEED_COST) return;
    
    updateCoins(-SEED_COST, 'Planted seed');
    plantSeed(plotIndex, calculateHarvestTime());
    toast.success('Seed planted! Come back in 1 hour to harvest.');
  };

  const handleHarvest = (plotIndex: number) => {
    const plot = plots[plotIndex];
    if (!plot.growing || !plot.readyToHarvest) return;

    updateCoins(HARVEST_REWARD, 'Harvested crops');
    harvestPlot(plotIndex);
    toast.success(`Harvested ${HARVEST_REWARD} coins!`);
  };

  return { handlePlant, handleHarvest };
};