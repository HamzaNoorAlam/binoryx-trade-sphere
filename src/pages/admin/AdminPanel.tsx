
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Target } from 'lucide-react';

interface Trade {
  id: string;
  userId: string;
  userEmail: string;
  asset: string;
  amount: number;
  direction: string;
  status?: string;
  timeLeft?: number;
  result?: string;
  timestamp?: string;
}

const AdminPanel = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const activeTrades: Trade[] = [
    { id: 'T001', userId: 'U123', userEmail: 'john@example.com', asset: 'EUR/USD', amount: 50.00, direction: 'UP', timeLeft: 45, status: 'Active' },
    { id: 'T002', userId: 'U456', userEmail: 'sarah@example.com', asset: 'BTC/USD', amount: 100.00, direction: 'DOWN', timeLeft: 12, status: 'Active' },
    { id: 'T003', userId: 'U789', userEmail: 'mike@example.com', asset: 'GBP/USD', amount: 25.00, direction: 'UP', timeLeft: 78, status: 'Active' },
    { id: 'T004', userId: 'U321', userEmail: 'emma@example.com', asset: 'USD/JPY', amount: 75.00, direction: 'DOWN', timeLeft: 23, status: 'Active' },
    { id: 'T005', userId: 'U654', userEmail: 'alex@example.com', asset: 'XAU/USD', amount: 60.00, direction: 'UP', timeLeft: 156, status: 'Active' }
  ];

  const recentTrades: Trade[] = [
    { id: 'T006', userId: 'U987', userEmail: 'lisa@example.com', asset: 'AUD/USD', amount: 40.00, direction: 'DOWN', result: 'Pending', timestamp: '2024-01-15 14:32:05' },
    { id: 'T007', userId: 'U147', userEmail: 'david@example.com', asset: 'USD/CAD', amount: 80.00, direction: 'UP', result: 'Pending', timestamp: '2024-01-15 14:30:22' },
    { id: 'T008', userId: 'U258', userEmail: 'maria@example.com', asset: 'ETH/USD', amount: 120.00, direction: 'DOWN', result: 'Pending', timestamp: '2024-01-15 14:28:15' }
  ];

  const platformStats = [
    { title: 'Active Users', value: '1,247', icon: Users, change: '+12%', positive: true },
    { title: 'Active Trades', value: activeTrades.length.toString(), icon: Activity, change: '+5', positive: true },
    { title: 'Platform Revenue', value: '$12,450', icon: DollarSign, change: '+18%', positive: true },
    { title: 'Win Rate Control', value: '65%', icon: Target, change: 'Target', positive: true }
  ];

  const handleForceResult = (tradeId: string, result: 'win' | 'loss') => {
    toast({
      title: `Trade ${result.toUpperCase()}`,
      description: `Trade ${tradeId} has been marked as ${result}`,
      variant: result === 'win' ? 'default' : 'destructive'
    });
  };

  const filteredTrades = [...activeTrades, ...recentTrades].filter(trade => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return trade.status === 'Active';
    if (statusFilter === 'pending') return trade.result === 'Pending';
    return true;
  });

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Admin Control Panel</h1>
        <p className="text-muted-foreground">Monitor and control all platform activities</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trade Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <CardTitle>Live Trade Control</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trades</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {filteredTrades.map((trade) => (
              <div key={trade.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{trade.id}</div>
                  <Badge variant={(trade.status === 'Active' || trade.result === 'Pending') ? 'default' : 'secondary'}>
                    {trade.status || trade.result || 'Completed'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>User: {trade.userEmail}</div>
                  <div className="flex items-center justify-between">
                    <span>{trade.asset}</span>
                    <div className="flex items-center gap-2">
                      {trade.direction === 'UP' ? 
                        <TrendingUp className="w-4 h-4 text-green-500" /> : 
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      }
                      <span>${trade.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  {trade.timeLeft && (
                    <div className="text-primary font-medium">{trade.timeLeft}s remaining</div>
                  )}
                </div>
                {(trade.result === 'Pending' || trade.status === 'Active') && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleForceResult(trade.id, 'win')}
                    >
                      Mark Win
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleForceResult(trade.id, 'loss')}
                    >
                      Mark Loss
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Trade ID</th>
                  <th className="text-left py-3">User</th>
                  <th className="text-left py-3">Asset</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Direction</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Time Left</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 font-medium">{trade.id}</td>
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{trade.userId}</div>
                        <div className="text-sm text-muted-foreground">{trade.userEmail}</div>
                      </div>
                    </td>
                    <td className="py-3">{trade.asset}</td>
                    <td className="py-3">${trade.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {trade.direction === 'UP' ? 
                          <TrendingUp className="w-4 h-4 text-green-500" /> : 
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        }
                        <Badge variant={trade.direction === 'UP' ? 'default' : 'destructive'}>
                          {trade.direction}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={(trade.status === 'Active' || trade.result === 'Pending') ? 'default' : 'secondary'}>
                        {trade.status || trade.result || 'Completed'}
                      </Badge>
                    </td>
                    <td className="py-3">
                      {trade.timeLeft ? (
                        <span className="text-primary font-medium">{trade.timeLeft}s</span>
                      ) : (
                        <span className="text-muted-foreground">Expired</span>
                      )}
                    </td>
                    <td className="py-3">
                      {(trade.result === 'Pending' || trade.status === 'Active') && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleForceResult(trade.id, 'win')}
                          >
                            Mark Win
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleForceResult(trade.id, 'loss')}
                          >
                            Mark Loss
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
