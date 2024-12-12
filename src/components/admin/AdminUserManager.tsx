import React from 'react';
import { Users, Ban, Coins } from 'lucide-react';
import { useAdminStore } from '../../store/admin/useAdminStore';

export function AdminUserManager() {
  const { adminActions } = useAdminStore();
  const [userId, setUserId] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleCoins = (action: 'add' | 'remove') => {
    const userIdNum = parseInt(userId, 10);
    const amountNum = parseInt(amount, 10);
    
    if (isNaN(userIdNum) || isNaN(amountNum)) return;
    
    if (action === 'add') {
      adminActions.addCoins(userIdNum, amountNum);
    } else {
      adminActions.removeCoins(userIdNum, amountNum);
    }
    
    setUserId('');
    setAmount('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">User Manager</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleCoins('add')}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Coins className="w-4 h-4" />
            <span>Add Coins</span>
          </button>
          
          <button
            onClick={() => handleCoins('remove')}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Ban className="w-4 h-4" />
            <span>Remove Coins</span>
          </button>
        </div>
      </div>
    </div>
  );
}