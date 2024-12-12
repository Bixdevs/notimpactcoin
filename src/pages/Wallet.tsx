import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Wallet as WalletIcon, History } from 'lucide-react';
import { TransactionList } from '../components/transactions/TransactionList';

export function Wallet() {
  const { coins, transactions } = useGameStore();

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-white/80">Total Balance</p>
            <h2 className="text-2xl font-bold text-white">{coins.toLocaleString()} coins</h2>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-5 h-5 text-white/80" />
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}