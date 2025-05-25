
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';

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
      icon: Clock,
      change: '+3',
      positive: true
    },
    {
      title: 'Win Rate',
      value: '78%',
      icon: TrendingUp,
      change: '+2.1%',
      positive: true
    }
  ];

  const recentTrades = [
    { asset: 'EUR/USD', amount: '$50', result: 'Win', profit: '+$42.50', time: '2 min ago' },
    { asset: 'BTC/USD', amount: '$100', result: 'Win', profit: '+$95.00', time: '5 min ago' },
    { asset: 'GBP/USD', amount: '$25', result: 'Loss', profit: '-$25.00', time: '8 min ago' },
    { asset: 'USD/JPY', amount: '$75', result: 'Win', profit: '+$67.50', time: '12 min ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's your trading overview for today</p>
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
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart and Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Market Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=5&theme=dark&style=1&locale=en&toolbar_bg=%23f1f3f6&enable_publishing=false&allow_symbol_change=true&referral_id=38514"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-semibold text-sm">{trade.asset}</div>
                    <div className="text-xs text-muted-foreground">{trade.amount} • {trade.time}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-sm ${
                      trade.result === 'Win' ? 'text-green-500' : 'text-red-500'
                    }`}>
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
