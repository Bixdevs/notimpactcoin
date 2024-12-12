import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Coins, ListTodo } from 'lucide-react';
import { useAdminStore } from '../../store/admin/useAdminStore';
import { AdminTaskManager } from '../../components/admin/AdminTaskManager';
import { AdminUserManager } from '../../components/admin/AdminUserManager';
import { TaskVerificationPanel } from '../../components/admin/TaskVerificationPanel';
import { toast } from 'react-hot-toast';

export function AdminPanel() {
  const navigate = useNavigate();
  const { isAdmin, checkAdminStatus } = useAdminStore();

  React.useEffect(() => {
    const checkAccess = () => {
      if (!checkAdminStatus()) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      }
    };

    checkAccess();
  }, [checkAdminStatus, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/80">Manage your NotImpactCoin community</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaskVerificationPanel />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminTaskManager />
          <AdminUserManager />
        </div>
      </div>
    </div>
  );
}