
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const paymentMethods = [
    { value: 'jazzcash', label: 'JazzCash', fee: '0%' },
    { value: 'easypaisa', label: 'Easypaisa', fee: '0%' },
    { value: 'bank', label: 'Bank Transfer', fee: '0%' },
    { value: 'usdt', label: 'USDT (Crypto)', fee: '2%' }
  ];

  const depositHistory = [
    { id: '1', amount: '$100', method: 'JazzCash', status: 'Completed', date: '2024-01-15' },
    { id: '2', amount: '$50', method: 'USDT', status: 'Processing', date: '2024-01-14' },
    { id: '3', amount: '$200', method: 'Bank Transfer', status: 'Completed', date: '2024-01-13' }
  ];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Deposit request submitted',
        description: 'Your deposit is being processed and will be credited shortly.'
      });
      setAmount('');
      setMethod('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposit Funds</h1>
        <p className="text-muted-foreground">Add money to your trading account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deposit Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Make a Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeposit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((pm) => (
                        <SelectItem key={pm.value} value={pm.value}>
                          {pm.label} ({pm.fee} fee)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="10"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum deposit: $10
                  </p>
                </div>

                {method && (
                  <div>
                    <label className="text-sm font-medium">Upload Payment Screenshot</label>
                    <Input type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload proof of payment (PNG, JPG, max 5MB)
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !method || !amount}
                >
                  {loading ? 'Processing...' : 'Submit Deposit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Deposit Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Deposit Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Processing Times</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>JazzCash: Instant</p>
                  <p>Easypaisa: Instant</p>
                  <p>Bank Transfer: 1-3 hours</p>
                  <p>USDT: 10-30 minutes</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Deposit Limits</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Minimum: $10</p>
                  <p>Maximum: $10,000</p>
                  <p>Daily Limit: $50,000</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Security</h4>
                <p className="text-sm text-muted-foreground">
                  All deposits are secured with 256-bit SSL encryption
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deposit History */}
      <Card>
        <CardHeader>
          <CardTitle>Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Method</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((deposit) => (
                  <tr key={deposit.id} className="border-b">
                    <td className="py-2">{deposit.id}</td>
                    <td className="py-2">{deposit.amount}</td>
                    <td className="py-2">{deposit.method}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        deposit.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deposit.status}
                      </span>
                    </td>
                    <td className="py-2">{deposit.date}</td>
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

export default DepositPage;
