
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowDownIcon, ArrowUpIcon, Plus } from 'lucide-react';

const WalletPage = () => {
  const { user } = useAuth();

  const transactions = [
    { id: '1', type: 'deposit', amount: '+$500.00', description: 'JazzCash Deposit', date: '2024-01-15 14:30' },
    { id: '2', type: 'trade', amount: '+$47.50', description: 'EUR/USD Trade Win', date: '2024-01-15 13:45' },
    { id: '3', type: 'trade', amount: '-$25.00', description: 'BTC/USD Trade Loss', date: '2024-01-15 13:20' },
    { id: '4', type: 'withdrawal', amount: '-$200.00', description: 'Bank Transfer Withdrawal', date: '2024-01-14 16:15' },
    { id: '5', type: 'bonus', amount: '+$100.00', description: 'Welcome Bonus', date: '2024-01-14 10:00' },
    { id: '6', type: 'trade', amount: '+$85.00', description: 'GBP/USD Trade Win', date: '2024-01-14 09:30' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon className="text-green-500" size={20} />;
      case 'withdrawal':
        return <ArrowUpIcon className="text-red-500" size={20} />;
      case 'bonus':
        return <Plus className="text-blue-500" size={20} />;
      case 'trade':
        return transactions.find(t => t.id)?.amount.startsWith('+') ? 
          <ArrowDownIcon className="text-green-500" size={20} /> : 
          <ArrowUpIcon className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-500';
      case 'withdrawal':
        return 'text-red-500';
      case 'bonus':
        return 'text-blue-500';
      case 'trade':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const filterTransactions = (type: string) => {
    if (type === 'all') return transactions;
    return transactions.filter(t => t.type === type);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet Overview</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${user?.balance?.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Available for trading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Bonus Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              $100.00
            </div>
            <p className="text-sm text-muted-foreground">Welcome bonus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Today's P/L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              +$107.50
            </div>
            <p className="text-sm text-muted-foreground">Profit/Loss</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposit">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
              <TabsTrigger value="trade">Trades</TabsTrigger>
              <TabsTrigger value="bonus">Bonuses</TabsTrigger>
            </TabsList>
            
            {['all', 'deposit', 'withdrawal', 'trade', 'bonus'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <div className="space-y-4">
                  {filterTransactions(tab).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getIcon(transaction.type)}
                        <div>
                          <div className="font-semibold">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${
                        transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
