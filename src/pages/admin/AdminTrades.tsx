
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AdminTrades = () => {
  const [resultFilter, setResultFilter] = useState('all');

  const trades = [
    {
      id: '1',
      user: 'john@example.com',
      asset: 'EUR/USD',
      amount: 50.00,
      direction: 'UP',
      result: 'Win',
      profit: 42.50,
      timestamp: '2024-01-15 14:30:15'
    },
    {
      id: '2',
      user: 'sarah@example.com',
      asset: 'BTC/USD',
      amount: 100.00,
      direction: 'DOWN',
      result: 'Loss',
      profit: -100.00,
      timestamp: '2024-01-15 14:28:42'
    },
    {
      id: '3',
      user: 'mike@example.com',
      asset: 'GBP/USD',
      amount: 25.00,
      direction: 'UP',
      result: 'Win',
      profit: 21.25,
      timestamp: '2024-01-15 14:25:18'
    },
    {
      id: '4',
      user: 'emma@example.com',
      asset: 'USD/JPY',
      amount: 75.00,
      direction: 'DOWN',
      result: 'Pending',
      profit: 0,
      timestamp: '2024-01-15 14:32:05'
    }
  ];

  const filteredTrades = trades.filter(trade => {
    if (resultFilter === 'all') return true;
    return trade.result.toLowerCase() === resultFilter;
  });

  const handleForceResult = (tradeId: string, result: string) => {
    console.log(`Force result for trade ${tradeId}: ${result}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Trade Management</h1>
          <p className="text-muted-foreground">Monitor and control trade outcomes</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Trades</CardTitle>
            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="win">Wins</SelectItem>
                <SelectItem value="loss">Losses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Trade ID</th>
                  <th className="text-left py-3">User</th>
                  <th className="text-left py-3">Asset</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Direction</th>
                  <th className="text-left py-3">Result</th>
                  <th className="text-left py-3">Profit/Loss</th>
                  <th className="text-left py-3">Time</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="border-b">
                    <td className="py-3">{trade.id}</td>
                    <td className="py-3">{trade.user}</td>
                    <td className="py-3">{trade.asset}</td>
                    <td className="py-3">${trade.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <Badge variant={trade.direction === 'UP' ? 'default' : 'destructive'}>
                        {trade.direction}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge 
                        variant={
                          trade.result === 'Win' ? 'default' : 
                          trade.result === 'Loss' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {trade.result}
                      </Badge>
                    </td>
                    <td className={`py-3 font-semibold ${
                      trade.profit > 0 ? 'text-green-500' : 
                      trade.profit < 0 ? 'text-red-500' : 
                      'text-muted-foreground'
                    }`}>
                      {trade.profit !== 0 ? `${trade.profit > 0 ? '+' : ''}$${trade.profit.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 text-sm">{trade.timestamp}</td>
                    <td className="py-3">
                      {trade.result === 'Pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleForceResult(trade.id, 'win')}
                          >
                            Force Win
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleForceResult(trade.id, 'loss')}
                          >
                            Force Loss
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

export default AdminTrades;
