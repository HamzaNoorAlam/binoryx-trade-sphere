
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, TrendingDown, DollarSign, Clock, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Account Balance',
      value: `$${user?.balance?.toFixed(2)}`,
      icon: DollarSign,
      change: '+5.2%',
      positive: true
    },
    {
      title: 'Today\'s Profit',
      value: '$156.80',
      icon: TrendingUp,
      change: '+12.4%',
      positive: true
    },
    {
      title: 'Total Trades',
      value: '47',
      icon: Activity,
      change: '+3',
      positive: true
    },
    {
      title: 'Win Rate',
      value: '78%',
      icon: Target,
      change: '+2.1%',
      positive: true
    }
  ];

  const recentTrades = [
    { id: '1', asset: 'EUR/USD', amount: '$50', result: 'Win', profit: '+$42.50', time: '2 min ago', direction: 'UP' },
    { id: '2', asset: 'BTC/USD', amount: '$100', result: 'Win', profit: '+$95.00', time: '5 min ago', direction: 'DOWN' },
    { id: '3', asset: 'GBP/USD', amount: '$25', result: 'Loss', profit: '-$25.00', time: '8 min ago', direction: 'UP' },
    { id: '4', asset: 'USD/JPY', amount: '$75', result: 'Win', profit: '+$67.50', time: '12 min ago', direction: 'DOWN' },
    { id: '5', asset: 'XAU/USD', amount: '$60', result: 'Loss', profit: '-$60.00', time: '15 min ago', direction: 'UP' }
  ];

  const quickActions = [
    { title: 'Start Trading', description: 'Open a new trade', link: '/dashboard/trading', icon: TrendingUp, color: 'bg-primary' },
    { title: 'Deposit Funds', description: 'Add money to your account', link: '/dashboard/deposit', icon: DollarSign, color: 'bg-green-600' },
    { title: 'View Wallet', description: 'Check transaction history', link: '/dashboard/wallet', icon: Clock, color: 'bg-blue-600' }
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Welcome Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">Here's your trading overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
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
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} to={action.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Chart and Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Market Chart</CardTitle>
              <Button asChild size="sm" variant="outline">
                <Link to="/dashboard/trading">Open Trading Room</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] lg:h-[400px]">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_mini&symbol=FX_IDC%3AEURUSD&interval=5&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Trades</CardTitle>
              <Button asChild size="sm" variant="outline">
                <Link to="/dashboard/wallet">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.slice(0, 5).map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm">{trade.asset}</div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        trade.direction === 'UP' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {trade.direction}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{trade.amount} • {trade.time}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-sm flex items-center gap-1 ${
                      trade.result === 'Win' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {trade.result === 'Win' ? '🟢' : '🔴'}
                      {trade.result}
                    </div>
                    <div className={`text-xs ${
                      trade.result === 'Win' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {trade.profit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
