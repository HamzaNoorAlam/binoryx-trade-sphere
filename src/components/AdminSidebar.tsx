
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Download,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: TrendingUp, label: 'Trades', path: '/admin/trades' },
    { icon: CreditCard, label: 'Deposits', path: '/admin/deposits' },
    { icon: Download, label: 'Withdrawals', path: '/admin/withdrawals' }
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="text-2xl font-bold text-primary">Binoryx</div>
        <div className="text-sm text-muted-foreground">Admin Panel</div>
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

export default AdminSidebar;
