
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradeHistory = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  const allTrades = [
    { id: '1', asset: 'EUR/USD', amount: 50.00, direction: 'UP', result: 'Win', profit: 42.50, timestamp: '2024-01-15 14:30:15', duration: '1m' },
    { id: '2', asset: 'BTC/USD', amount: 100.00, direction: 'DOWN', result: 'Loss', profit: -100.00, timestamp: '2024-01-15 14:28:42', duration: '30s' },
    { id: '3', asset: 'GBP/USD', amount: 25.00, direction: 'UP', result: 'Win', profit: 21.25, timestamp: '2024-01-15 14:25:18', duration: '2m' },
    { id: '4', asset: 'USD/JPY', amount: 75.00, direction: 'DOWN', result: 'Win', profit: 63.75, timestamp: '2024-01-14 16:15:30', duration: '5m' },
    { id: '5', asset: 'XAU/USD', amount: 60.00, direction: 'UP', result: 'Loss', profit: -60.00, timestamp: '2024-01-14 15:45:22', duration: '1m' },
    { id: '6', asset: 'AUD/USD', amount: 40.00, direction: 'DOWN', result: 'Win', profit: 34.00, timestamp: '2024-01-14 15:20:18', duration: '15s' },
    { id: '7', asset: 'USD/CAD', amount: 80.00, direction: 'UP', result: 'Loss', profit: -80.00, timestamp: '2024-01-14 14:55:45', duration: '30s' },
    { id: '8', asset: 'ETH/USD', amount: 120.00, direction: 'DOWN', result: 'Win', profit: 102.00, timestamp: '2024-01-14 14:30:12', duration: '1h' },
    { id: '9', asset: 'EUR/GBP', amount: 35.00, direction: 'UP', result: 'Win', profit: 29.75, timestamp: '2024-01-14 13:45:33', duration: '2m' },
    { id: '10', asset: 'USD/CHF', amount: 90.00, direction: 'DOWN', result: 'Loss', profit: -90.00, timestamp: '2024-01-14 13:20:55', duration: '5m' },
    { id: '11', asset: 'NZD/USD', amount: 55.00, direction: 'UP', result: 'Win', profit: 46.75, timestamp: '2024-01-14 12:55:20', duration: '1m' },
    { id: '12', asset: 'LTC/USD', amount: 65.00, direction: 'DOWN', result: 'Win', profit: 55.25, timestamp: '2024-01-14 12:30:40', duration: '30s' }
  ];

  const filteredTrades = allTrades.filter(trade => {
    if (statusFilter === 'all') return true;
    return trade.result.toLowerCase() === statusFilter;
  });

  const totalPages = Math.ceil(filteredTrades.length / tradesPerPage);
  const startIndex = (currentPage - 1) * tradesPerPage;
  const paginatedTrades = filteredTrades.slice(startIndex, startIndex + tradesPerPage);

  const stats = {
    totalTrades: allTrades.length,
    winRate: Math.round((allTrades.filter(t => t.result === 'Win').length / allTrades.length) * 100),
    totalProfit: allTrades.reduce((sum, trade) => sum + trade.profit, 0),
    bestTrade: Math.max(...allTrades.map(t => t.profit))
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Trade History</h1>
        <p className="text-muted-foreground">Complete record of your trading activity</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalTrades}</div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${stats.totalProfit.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total P/L</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">${stats.bestTrade.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Best Trade</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade History Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <CardTitle>Trading History</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trades</SelectItem>
                <SelectItem value="win">Wins Only</SelectItem>
                <SelectItem value="loss">Losses Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {paginatedTrades.map((trade) => (
              <div key={trade.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{trade.asset}</div>
                  <div className="flex items-center gap-2">
                    {trade.result === 'Win' ? '🟢' : '🔴'}
                    <Badge variant={trade.result === 'Win' ? 'default' : 'destructive'}>
                      {trade.result}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Amount: ${trade.amount.toFixed(2)}</div>
                  <div className="flex items-center gap-1">
                    {trade.direction === 'UP' ? 
                      <TrendingUp className="w-3 h-3 text-green-500" /> : 
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    }
                    {trade.direction}
                  </div>
                  <div className={`font-semibold ${trade.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                  </div>
                  <div className="text-muted-foreground">{trade.duration}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">{trade.timestamp}</div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Trade ID</th>
                  <th className="text-left py-3">Asset</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Direction</th>
                  <th className="text-left py-3">Duration</th>
                  <th className="text-left py-3">Result</th>
                  <th className="text-left py-3">Profit/Loss</th>
                  <th className="text-left py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrades.map((trade) => (
                  <tr key={trade.id} className="border-b hover:bg-muted/50">
                    <td className="py-3">#{trade.id}</td>
                    <td className="py-3 font-medium">{trade.asset}</td>
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
                    <td className="py-3">{trade.duration}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {trade.result === 'Win' ? '🟢' : '🔴'}
                        <Badge variant={trade.result === 'Win' ? 'default' : 'destructive'}>
                          {trade.result}
                        </Badge>
                      </div>
                    </td>
                    <td className={`py-3 font-semibold ${
                      trade.profit > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{trade.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeHistory;
