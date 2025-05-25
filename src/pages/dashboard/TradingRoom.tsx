
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradingRoom = () => {
  const [amount, setAmount] = useState('10');
  const [timeframe, setTimeframe] = useState('1m');
  const [asset, setAsset] = useState('EUR/USD');
  const { toast } = useToast();

  const handleTrade = (direction: 'up' | 'down') => {
    const tradeResult = Math.random() > 0.5 ? 'win' : 'loss';
    const profit = tradeResult === 'win' ? parseFloat(amount) * 0.85 : -parseFloat(amount);
    
    toast({
      title: `Trade ${tradeResult === 'win' ? 'Won!' : 'Lost'}`,
      description: `${direction.toUpperCase()} ${asset} - ${profit > 0 ? '+' : ''}$${profit.toFixed(2)}`,
      variant: tradeResult === 'win' ? 'default' : 'destructive'
    });
  };

  const timeframes = [
    { value: '5s', label: '5 seconds' },
    { value: '15s', label: '15 seconds' },
    { value: '30s', label: '30 seconds' },
    { value: '1m', label: '1 minute' },
    { value: '2m', label: '2 minutes' },
    { value: '5m', label: '5 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '4h', label: '4 hours' }
  ];

  const assets = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD',
    'BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'ADA/USD'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Room</h1>
        <p className="text-muted-foreground">Trade binary options with live market data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Chart - {asset}</CardTitle>
                <div className="flex items-center space-x-4">
                  <Select value={asset} onValueChange={setAsset}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <iframe
                src={`https://s.tradingview.com/widgetembed/?symbol=${asset.replace('/', '')}&interval=${timeframe}&theme=dark&style=1&locale=en&toolbar_bg=%23f1f3f6&enable_publishing=false&allow_symbol_change=false&referral_id=38514`}
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Place Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Timeframe</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((tf) => (
                      <SelectItem key={tf.value} value={tf.value}>
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Potential Payout</div>
                <div className="text-xl font-bold text-primary">
                  ${(parseFloat(amount || '0') * 1.85).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">85% profit</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="trading-up text-white font-bold py-4"
                  onClick={() => handleTrade('up')}
                >
                  <TrendingUp className="mr-2" />
                  UP
                </Button>
                <Button 
                  className="trading-down text-white font-bold py-4"
                  onClick={() => handleTrade('down')}
                >
                  <TrendingDown className="mr-2" />
                  DOWN
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Active Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No active trades
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingRoom;
