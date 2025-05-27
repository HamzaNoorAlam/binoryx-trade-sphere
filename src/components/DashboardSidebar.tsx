
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  TrendingUp, 
  CreditCard, 
  Wallet, 
  User, 
  LogOut,
  Download,
  Upload,
  History
} from 'lucide-react';

const DashboardSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Trading Room', path: '/dashboard/trading' },
    { icon: Upload, label: 'Deposit', path: '/dashboard/deposit' },
    { icon: Download, label: 'Withdraw', path: '/dashboard/withdraw' },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: History, label: 'Trade History', path: '/dashboard/history' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' }
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="text-2xl font-bold text-primary">
          Binoryx
        </Link>
      </div>

      <div className="p-4 border-b border-border">
        <div className="text-sm text-muted-foreground">Welcome back</div>
        <div className="font-semibold">{user?.name}</div>
        <div className="text-2xl font-bold text-primary mt-2">
          ${user?.balance?.toFixed(2)}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
