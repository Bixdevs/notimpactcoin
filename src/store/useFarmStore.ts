import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FarmState, Plot } from './types';

const GROWTH_TIME = 3600000; // 1 hour in milliseconds

const createInitialPlots = (): Plot[] => 
  Array(4).fill(null).map(() => ({
    growing: false,
    plantedAt: 0,
    harvestTime: 0,
    readyToHarvest: false,
  }));

export const useFarmStore = create<FarmState>()(
  persist(
    (set) => ({
      plots: createInitialPlots(),
      
      plantSeed: (plotIndex: number) => {
        const now = Date.now();
        set((state) => ({
          plots: state.plots.map((plot, i) =>
            i === plotIndex
              ? {
                  growing: true,
                  plantedAt: now,
                  harvestTime: now + GROWTH_TIME,
                  readyToHarvest: false,
                }
              : plot
          ),
        }));
      },

      harvestPlot: (plotIndex: number) => {
        set((state) => ({
          plots: state.plots.map((plot, i) =>
            i === plotIndex
              ? {
                  growing: false,
                  plantedAt: 0,
                  harvestTime: 0,
                  readyToHarvest: false,
                }
              : plot
          ),
        }));
      },

      checkPlots: () => {
        const now = Date.now();
        set((state) => ({
          plots: state.plots.map((plot) => ({
            ...plot,
            readyToHarvest: plot.growing && now >= plot.harvestTime,
          })),
        }));
      },
    }),
    {
      name: 'farm-storage',
      version: 1,
    }
  )
);