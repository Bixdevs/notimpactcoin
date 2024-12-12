import React from 'react';
import { PlotGrid } from '../../components/farm/PlotGrid';

export function Farm() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-500 p-4">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-2xl font-bold text-white mb-6">Coin Farm</h1>
        <PlotGrid />
      </div>
    </div>
  );
}