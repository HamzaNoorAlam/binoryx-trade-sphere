
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  ZoomIn, 
  ZoomOut,
  BarChart3,
  Calendar,
  HelpCircle,
  Bell,
  User,
  ChevronDown,
  X
} from 'lucide-react';

const OlympTradeDashboard = () => {
  const [activeTab, setActiveTab] = useState('Fixed Time');
  const [tradeAmount, setTradeAmount] = useState(1000);
  const [duration, setDuration] = useState('1 min');
  const [enableOrders, setEnableOrders] = useState(false);

  const tabs = ['Fixed Time', 'Forex', 'Stocks'];

  const assets = [
    { 
      name: 'EUR/USD', 
      payout: '82%', 
      flag: '🇪🇺🇺🇸',
      change: 'FT',
      active: true 
    },
    { 
      name: 'Asia Composite Index', 
      payout: '82%', 
      flag: '📊',
      change: 'FT',
      active: false 
    },
    { 
      name: 'Gold', 
      payout: '82%', 
      flag: '🥇',
      change: 'FT',
      active: false 
    },
    { 
      name: 'Crypto Composite Index', 
      payout: '82%', 
      flag: '₿',
      change: 'FT',
      active: false 
    },
    { 
      name: 'Europe Composite Index', 
      payout: '82%', 
      flag: '🇪🇺',
      change: 'FT',
      active: false 
    }
  ];

  const activeTrades = [
    {
      id: 1,
      asset: 'Europe Composite I...',
      amount: '₫1K',
      profit: '+₫910.00',
      timer: '00:55',
      flag: '🇪🇺',
      percentage: '+91%'
    }
  ];

  const tradeHistory = [
    {
      id: 1,
      asset: 'Europe Composite Index',
      amount: '₫600.00',
      result: '-₫600.00',
      percentage: '+89%',
      duration: '1 min',
      openTime: 'May 28, 09:34:14 220',
      closeTime: 'May 28, 09:35:14 220',
      openQuote: '7,696.53',
      closeQuote: '7,696.30',
      flag: '🇪🇺'
    }
  ];

  const sidebarIcons = [
    { icon: BarChart3, label: 'Trades', active: true },
    { icon: TrendingUp, label: 'Market', active: false },
    { icon: Calendar, label: 'Events', active: false },
    { icon: HelpCircle, label: 'Help', active: false }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Left Vertical Sidebar */}
      <div className="w-16 bg-[#1a1a1a] border-r border-gray-800 flex flex-col items-center py-4 space-y-6">
        {sidebarIcons.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              item.active 
                ? 'bg-[#00e676] text-black' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <item.icon size={20} />
          </div>
        ))}
      </div>

      {/* Left Panel - Trades */}
      <div className="w-80 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trades</h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Plus size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <X size={16} />
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-[#00e676]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Active Trades */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">Active Trades</h3>
          <div className="text-sm text-gray-400 mb-2">
            Total amount: <span className="text-white">₫1,000.00</span>
          </div>
          <div className="text-sm text-gray-400 mb-4">
            Profit and loss: <span className="text-[#00e676]">+₫910.00</span>
          </div>

          {activeTrades.map((trade) => (
            <Card key={trade.id} className="bg-[#2a2a2a] border-gray-700 mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{trade.flag}</span>
                    <span className="text-sm font-medium">{trade.asset}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#00e676] font-medium">{trade.percentage}</div>
                    <div className="text-xs text-gray-400">{trade.timer}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{trade.amount}</span>
                  <span className="text-[#00e676] font-medium">{trade.profit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* History */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">History</h3>
            <Button variant="ghost" size="sm" className="text-[#00e676]">
              Show All
            </Button>
          </div>

          {tradeHistory.map((trade) => (
            <Card key={trade.id} className="bg-[#2a2a2a] border-gray-700 mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{trade.flag}</span>
                    <span className="text-sm">{trade.asset}</span>
                  </div>
                  <span className="text-[#ff1744]">{trade.result}</span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mb-2 bg-transparent border-gray-600 text-gray-300">
                  Show on Chart
                </Button>

                {/* Mini Chart */}
                <div className="h-16 bg-[#1a1a1a] rounded mb-2 flex items-center justify-center">
                  <TrendingDown className="text-[#ff1744]" size={24} />
                </div>

                {/* Trade Details */}
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Income</span>
                    <span>₫0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closed</span>
                    <span>with a loss</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{trade.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span>{trade.amount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Center Panel - Chart */}
      <div className="flex-1 flex flex-col">
        {/* Asset Selector */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 p-4">
          <div className="flex space-x-4 overflow-x-auto">
            {assets.map((asset, index) => (
              <Card
                key={index}
                className={`min-w-[200px] cursor-pointer transition-all ${
                  asset.active
                    ? 'bg-[#2a2a2a] border-[#00e676]'
                    : 'bg-[#2a2a2a] border-gray-700 hover:border-gray-600'
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{asset.flag}</span>
                      <span className="font-medium text-sm">{asset.name}</span>
                    </div>
                    <Badge className="bg-[#00e676] text-black text-xs">
                      {asset.change} - {asset.payout}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative bg-[#0f0f0f]">
          {/* Chart Container */}
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full bg-[#1a1a1a] rounded-lg relative overflow-hidden">
              {/* Chart Grid and Candlesticks Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
                {/* Simulated Chart Lines */}
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2a2a" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Simulated Candlesticks */}
                  <rect x="100" y="200" width="8" height="60" fill="#00e676" />
                  <rect x="120" y="180" width="8" height="80" fill="#ff1744" />
                  <rect x="140" y="220" width="8" height="40" fill="#00e676" />
                  <rect x="160" y="190" width="8" height="70" fill="#ff1744" />
                  <rect x="180" y="210" width="8" height="50" fill="#00e676" />
                </svg>
              </div>

              {/* Price Marker */}
              <div className="absolute top-1/2 right-4 bg-white text-black px-2 py-1 rounded text-sm font-mono">
                ⌘ 7691.51
              </div>

              {/* Trade Marker */}
              <div className="absolute top-1/3 left-1/3 bg-[#00e676] text-black px-2 py-1 rounded-full text-xs font-bold">
                ₫1000
              </div>

              {/* Timer */}
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-sm">
                00:50
              </div>

              {/* Chart Controls */}
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button size="sm" variant="ghost" className="bg-black/50">
                  1m
                </Button>
                <Button size="sm" variant="ghost" className="bg-black/50">
                  <ZoomOut size={16} />
                </Button>
                <Button size="sm" variant="ghost" className="bg-black/50">
                  <ZoomIn size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Trading */}
      <div className="w-80 bg-[#1a1a1a] border-l border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="text-right">
              <div className="text-2xl font-bold">₫19,503.06</div>
              <div className="text-sm text-gray-400">Demo Account</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-[#00e676] hover:bg-[#00c962] text-black font-medium">
                Payments
              </Button>
              <div className="relative">
                <Bell size={20} className="text-gray-400" />
                <div className="absolute -top-1 -right-1 bg-[#00e676] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </div>
              </div>
              <User size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Trading Form */}
        <div className="p-4 space-y-4">
          {/* Amount */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Amount</label>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="bg-[#2a2a2a] border border-gray-600"
                onClick={() => setTradeAmount(Math.max(1, tradeAmount - 100))}
              >
                <Minus size={16} />
              </Button>
              <Input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(Number(e.target.value))}
                className="flex-1 bg-[#2a2a2a] border-gray-600 text-center font-mono"
              />
              <Button
                size="sm"
                variant="ghost"
                className="bg-[#2a2a2a] border border-gray-600"
                onClick={() => setTradeAmount(tradeAmount + 100)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Duration</label>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="bg-[#2a2a2a] border border-gray-600"
              >
                <Minus size={16} />
              </Button>
              <div className="flex-1 bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-center">
                {duration}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="bg-[#2a2a2a] border border-gray-600"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Enable Orders */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable Orders</span>
            <Switch checked={enableOrders} onCheckedChange={setEnableOrders} />
          </div>

          {/* Trading Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full h-12 bg-[#00e676] hover:bg-[#00c962] text-black font-bold text-lg shadow-lg"
            >
              <TrendingUp className="mr-2" size={20} />
              Up
            </Button>
            <Button
              className="w-full h-12 bg-[#ff1744] hover:bg-[#d50000] text-white font-bold text-lg shadow-lg"
            >
              <TrendingDown className="mr-2" size={20} />
              Down
            </Button>
          </div>

          {/* Profit Display */}
          <div className="bg-[#2a2a2a] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Profit:</span>
              <div className="flex items-center space-x-1">
                <span className="text-[#00e676] font-bold">+₫910</span>
                <HelpCircle size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlympTradeDashboard;
