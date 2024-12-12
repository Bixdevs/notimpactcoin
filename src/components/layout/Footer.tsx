import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, GamepadIcon, Users, ShoppingBag, ListTodo, Shield } from 'lucide-react';
import { useAdminStore } from '../../store/admin/useAdminStore';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, checkAdminStatus } = useAdminStore();

  React.useEffect(() => {
    // Check admin status on component mount
    checkAdminStatus();
  }, [checkAdminStatus]);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: GamepadIcon, label: 'Games', path: '/games' },
    { icon: Users, label: 'Referral', path: '/referral' },
    { icon: ShoppingBag, label: 'Store', path: '/store' },
    { icon: ListTodo, label: 'Tasks', path: '/tasks' },
  ];

  // Add admin panel link if user is admin
  if (isAdmin) {
    navItems.push({
      icon: Shield,
      label: 'Admin',
      path: '/admin',
    });
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 h-16">
        <ul className="h-full flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center space-y-1 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}