
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Trading Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Account Balance</div>
            <div className="text-xl font-bold text-primary">
              ${user?.balance?.toFixed(2)}
            </div>
          </div>
          
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
