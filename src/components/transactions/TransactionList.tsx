import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Transaction } from '../../types/transactions';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((tx, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${
              tx.type === 'earn' ? 'bg-green-500/20' : 'bg-red-500/20'
            } flex items-center justify-center`}>
              {tx.type === 'earn' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div>
              <p className="text-white font-medium">{tx.description}</p>
              <p className="text-white/60 text-sm">
                {new Date(tx.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <span className={`font-bold ${
            tx.type === 'earn' ? 'text-green-400' : 'text-red-400'
          }`}>
            {tx.type === 'earn' ? '+' : '-'}{tx.amount}
          </span>
        </div>
      ))}
    </div>
  );
}