import { Plot } from '../types/farm';
import { PLOT_COUNT, GROWTH_TIME } from '../constants/farm';

export const createInitialPlots = (): Plot[] => 
  Array(PLOT_COUNT).fill(null).map(() => ({
    growing: false,
    plantedAt: 0,
    harvestTime: 0,
    readyToHarvest: false,
  }));

export const isPlotReady = (plot: Plot): boolean => {
  return plot.growing && Date.now() >= plot.harvestTime;
};

export const calculateHarvestTime = (): number => {
  return Date.now() + GROWTH_TIME;
};