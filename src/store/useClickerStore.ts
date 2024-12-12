import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  power: number;
  purchased: boolean;
}

interface ClickerState {
  clickPower: number;
  upgrades: Upgrade[];
  purchaseUpgrade: (id: string) => void;
}

export const useClickerStore = create<ClickerState>()(
  persist(
    (set) => ({
      clickPower: 1,
      upgrades: [
        {
          id: 'double',
          name: 'Double Click',
          description: 'Double your click power',
          cost: 500,
          power: 2,
          purchased: false,
        },
        {
          id: 'triple',
          name: 'Triple Click',
          description: 'Triple your click power',
          cost: 1500,
          power: 3,
          purchased: false,
        },
        {
          id: 'mega',
          name: 'Mega Click',
          description: '5x click power',
          cost: 5000,
          power: 5,
          purchased: false,
        },
      ],
      purchaseUpgrade: (id) =>
        set((state) => ({
          upgrades: state.upgrades.map((upgrade) =>
            upgrade.id === id ? { ...upgrade, purchased: true } : upgrade
          ),
          clickPower: state.upgrades.find((u) => u.id === id)?.power || state.clickPower,
        })),
    }),
    {
      name: 'clicker-storage',
    }
  )
);