
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, TrendingDown, Clock, DollarSign, AlertCircle, Settings, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const TradingRoom = () => {
  const [amount, setAmount] = useState('10');
  const [timeframe, setTimeframe] = useState('1m');
  const [asset, setAsset] = useState('EURUSD');
  const [chartTimeframe, setChartTimeframe] = useState('1');
  const [darkMode, setDarkMode] = useState(true);
  const [showTechnicalAnalysis, setShowTechnicalAnalysis] = useState(false);
  const { toast } = useToast();
  const { user, activeTrades, placeTrade, cancelTrade, switchAccount, addDemoFunds } = useAuth();

  const handleTrade = (direction: 'UP' | 'DOWN') => {
    if (!user) return;
    
    const tradeAmount = parseFloat(amount);
    const currentBalance = user.accountType === 'real' ? user.realBalance : user.demoBalance;
    
    if (tradeAmount > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${user.accountType} balance for this trade.`,
        variant: "destructive"
      });
      return;
    }
    
    const duration = getTimeframeDuration(timeframe);
    placeTrade({
      asset,
      amount: tradeAmount,
      direction,
      duration,
      entryPrice: Math.random() * 1000 + 1000 // Simulated price
    });
    
    toast({
      title: "Trade Opened!",
      description: `${direction} ${asset} - $${amount} for ${timeframe}`,
    });
  };

  const getTimeframeDuration = (tf: string) => {
    const durations = {
      '5s': 5, '15s': 15, '30s': 30, '1m': 60, 
      '2m': 120, '5m': 300, '15m': 900, '1h': 3600
    };
    return durations[tf as keyof typeof durations] || 60;
  };

  const handleCancelTrade = (tradeId: string) => {
    const refundPercentage = cancelTrade(tradeId);
    toast({
      title: "Trade Cancelled",
      description: `Refund: ${refundPercentage}% of trade amount`,
      variant: refundPercentage > 0 ? "default" : "destructive"
    });
  };

  const timeframes = [
    { value: '5s', label: '5 seconds' },
    { value: '15s', label: '15 seconds' },
    { value: '30s', label: '30 seconds' },
    { value: '1m', label: '1 minute' },
    { value: '2m', label: '2 minutes' },
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '1h', label: '1 hour' }
  ];

  const assets = [
    { value: 'EURUSD', label: 'EUR/USD', payout: '85%' },
    { value: 'GBPUSD', label: 'GBP/USD', payout: '82%' },
    { value: 'USDJPY', label: 'USD/JPY', payout: '80%' },
    { value: 'AUDUSD', label: 'AUD/USD', payout: '83%' },
    { value: 'USDCAD', label: 'USD/CAD', payout: '81%' },
    { value: 'BTCUSD', label: 'BTC/USD', payout: '90%' },
    { value: 'ETHUSD', label: 'ETH/USD', payout: '88%' },
    { value: 'XAUUSD', label: 'Gold/USD', payout: '87%' }
  ];

  const chartTimeframes = [
    { value: '1', label: '1m' },
    { value: '5', label: '5m' },
    { value: '15', label: '15m' },
    { value: '30', label: '30m' },
    { value: '60', label: '1h' },
    { value: '240', label: '4h' },
    { value: 'D', label: '1D' }
  ];

  const selectedAsset = assets.find(a => a.value === asset);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Trading Room</h1>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {user?.accountType === 'real' ? 'Real Account' : 'Demo Account'}
              </Badge>
              <span className="text-lg font-bold text-primary">
                ${user?.accountType === 'real' ? user.realBalance.toFixed(2) : user?.demoBalance.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={user?.accountType} onValueChange={switchAccount}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="real">Real</SelectItem>
              </SelectContent>
            </Select>
            
            {user?.accountType === 'demo' && (
              <Button onClick={addDemoFunds} variant="outline" size="sm">
                Add $10k Demo
              </Button>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-sm">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Chart Area */}
        <div className="flex-1 p-4 lg:p-6">
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <CardTitle>{selectedAsset?.label}</CardTitle>
                  <Badge className="bg-green-600 text-white">
                    Payout: {selectedAsset?.payout}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {chartTimeframes.map((tf) => (
                    <Button
                      key={tf.value}
                      variant={chartTimeframe === tf.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartTimeframe(tf.value)}
                    >
                      {tf.label}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTechnicalAnalysis(!showTechnicalAnalysis)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Tools
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="w-full h-[400px] lg:h-[600px] relative">
                <iframe
                  src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=FX_IDC%3A${asset}&interval=${chartTimeframe}&hidesidetoolbar=1&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies,MACD%40tv-basicstudies&theme=${darkMode ? 'dark' : 'light'}&style=1&timezone=Etc%2FUTC&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&details=1&calendar=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${asset}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              {/* Active Trades Overlay */}
              {activeTrades.length > 0 && (
                <div className="absolute top-4 right-4 space-y-2 max-w-xs">
                  {activeTrades.filter(trade => trade.result === 'pending').map((trade) => (
                    <Card key={trade.id} className="bg-background/90 backdrop-blur">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {trade.direction === 'UP' ? 
                              <TrendingUp className="w-4 h-4 text-green-500" /> : 
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            }
                            <span className="font-semibold text-sm">{trade.asset}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCancelTrade(trade.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-xs space-y-1">
                          <div>Amount: ${trade.amount.toFixed(2)}</div>
                          <div>Entry: ${trade.entryPrice.toFixed(4)}</div>
                          <div className="text-primary">
                            Time Left: {Math.max(0, Math.ceil((trade.duration * 1000 - (Date.now() - trade.startTime)) / 1000))}s
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="w-full lg:w-80 p-4 lg:p-6 lg:border-l border-border">
          <div className="space-y-6">
            {/* Asset Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Asset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={asset} onValueChange={setAsset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{a.label}</span>
                          <Badge variant="secondary" className="ml-2">
                            {a.payout}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Trade Placement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Place Trade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Trade Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                  />
                  <div className="flex gap-2 mt-2">
                    {['10', '25', '50', '100'].map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(preset)}
                        className="flex-1"
                      >
                        ${preset}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Expiry Time</label>
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
                  <div className="text-2xl font-bold text-primary">
                    ${(parseFloat(amount || '0') * (parseFloat(selectedAsset?.payout?.replace('%', '') || '85') / 100)).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedAsset?.payout} profit</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="trading-up text-white font-bold py-4"
                    onClick={() => handleTrade('UP')}
                  >
                    <TrendingUp className="mr-2" />
                    UP
                  </Button>
                  <Button 
                    className="trading-down text-white font-bold py-4"
                    onClick={() => handleTrade('DOWN')}
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
                <CardTitle>Active Trades ({activeTrades.filter(t => t.result === 'pending').length})</CardTitle>
              </CardHeader>
              <CardContent>
                {activeTrades.filter(t => t.result === 'pending').length > 0 ? (
                  <div className="space-y-3">
                    {activeTrades.filter(t => t.result === 'pending').map((trade) => (
                      <div key={trade.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm">{trade.asset}</div>
                          <div className="flex items-center gap-1">
                            {trade.direction === 'UP' ? 
                              <TrendingUp className="w-4 h-4 text-green-500" /> : 
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            }
                            <span className="text-sm">{trade.direction}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Amount: ${trade.amount.toFixed(2)}</div>
                          <div>Entry: ${trade.entryPrice.toFixed(4)}</div>
                          <div className="text-primary">
                            {Math.max(0, Math.ceil((trade.duration * 1000 - (Date.now() - trade.startTime)) / 1000))}s remaining
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full mt-2"
                          onClick={() => handleCancelTrade(trade.id)}
                        >
                          Cancel Trade
                        </Button>
                      </div>
                    ))}
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
