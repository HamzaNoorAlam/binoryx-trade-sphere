
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

const TradingRoom = () => {
  const [amount, setAmount] = useState('10');
  const [timeframe, setTimeframe] = useState('1m');
  const [asset, setAsset] = useState('EURUSD');
  const [isTrading, setIsTrading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleTrade = (direction: 'up' | 'down') => {
    if (isTrading) return;
    
    setIsTrading(true);
    const duration = getTimeframeDuration(timeframe);
    setCountdown(duration);
    
    toast({
      title: "Trade Opened!",
      description: `${direction.toUpperCase()} ${asset} - $${amount} for ${timeframe}`,
    });
  };

  const getTimeframeDuration = (tf: string) => {
    const durations = {
      '5s': 5, '15s': 15, '30s': 30, '1m': 60, 
      '2m': 120, '5m': 300, '1h': 3600, '4h': 14400
    };
    return durations[tf as keyof typeof durations] || 60;
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isTrading && countdown === 0) {
      const result = Math.random() > 0.45 ? 'win' : 'loss';
      const profit = result === 'win' ? parseFloat(amount) * 0.85 : -parseFloat(amount);
      
      toast({
        title: `Trade ${result === 'win' ? 'Won!' : 'Lost'}`,
        description: `${profit > 0 ? '+' : ''}$${profit.toFixed(2)}`,
        variant: result === 'win' ? 'default' : 'destructive'
      });
      setIsTrading(false);
    }
  }, [countdown, isTrading, amount]);

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
    { value: 'EURUSD', label: 'EUR/USD' },
    { value: 'GBPUSD', label: 'GBP/USD' },
    { value: 'USDJPY', label: 'USD/JPY' },
    { value: 'AUDUSD', label: 'AUD/USD' },
    { value: 'USDCAD', label: 'USD/CAD' },
    { value: 'BTCUSD', label: 'BTC/USD' },
    { value: 'ETHUSD', label: 'ETH/USD' },
    { value: 'XAUUSD', label: 'Gold/USD' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Trading Room</h1>
          <div className="flex items-center space-x-2">
            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assets.map((a) => (
                  <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Chart Area */}
        <div className="flex-1 p-4 lg:p-6">
          <Card className="h-full">
            <CardHeader className="hidden lg:block">
              <div className="flex items-center justify-between">
                <CardTitle>Live Chart - {assets.find(a => a.value === asset)?.label}</CardTitle>
                <div className="flex items-center space-x-4">
                  <Select value={asset} onValueChange={setAsset}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-32">
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
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] lg:h-[600px] relative">
                <iframe
                  src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=FX_IDC%3A${asset}&interval=1&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${asset}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="w-full lg:w-80 p-4 lg:p-6 lg:border-l border-border">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Place Trade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mobile Timeframe Selector */}
                <div className="lg:hidden">
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

                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    disabled={isTrading}
                  />
                </div>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Potential Payout</div>
                  <div className="text-2xl font-bold text-primary">
                    ${(parseFloat(amount || '0') * 1.85).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">85% profit</div>
                </div>

                {isTrading && countdown > 0 && (
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-primary">{countdown}s</div>
                    <div className="text-sm text-muted-foreground">Trade in progress...</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="trading-up text-white font-bold py-4 disabled:opacity-50"
                    onClick={() => handleTrade('up')}
                    disabled={isTrading}
                  >
                    <TrendingUp className="mr-2" />
                    UP
                  </Button>
                  <Button 
                    className="trading-down text-white font-bold py-4 disabled:opacity-50"
                    onClick={() => handleTrade('down')}
                    disabled={isTrading}
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
                {isTrading ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">{assets.find(a => a.value === asset)?.label}</div>
                        <div className="text-xs text-muted-foreground">${amount}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary">{countdown}s</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No active trades
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingRoom;
