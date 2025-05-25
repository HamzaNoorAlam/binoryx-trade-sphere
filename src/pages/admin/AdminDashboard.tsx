
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      change: '+12.5%',
      positive: true
    },
    {
      title: 'Total Trades',
      value: '15,923',
      icon: TrendingUp,
      change: '+8.2%',
      positive: true
    },
    {
      title: 'Platform Revenue',
      value: '$45,230',
      icon: DollarSign,
      change: '+15.3%',
      positive: true
    },
    {
      title: 'Pending Requests',
      value: '23',
      icon: AlertCircle,
      change: '-2',
      positive: true
    }
  ];

  const recentActivity = [
    { user: 'john@example.com', action: 'New deposit', amount: '$500', time: '2 min ago' },
    { user: 'sarah@example.com', action: 'Withdrawal request', amount: '$200', time: '5 min ago' },
    { user: 'mike@example.com', action: 'Account verification', amount: '-', time: '10 min ago' },
    { user: 'emma@example.com', action: 'Trade completed', amount: '$85', time: '15 min ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-semibold text-sm">{activity.user}</div>
                    <div className="text-sm text-muted-foreground">{activity.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{activity.amount}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Win Rate</span>
                <span className="font-bold text-green-500">72%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Traders</span>
                <span className="font-bold">834</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Daily Volume</span>
                <span className="font-bold">$125,430</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Platform Uptime</span>
                <span className="font-bold text-green-500">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
