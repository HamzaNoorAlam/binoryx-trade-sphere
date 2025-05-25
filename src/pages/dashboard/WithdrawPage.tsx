
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const withdrawalMethods = [
    { value: 'jazzcash', label: 'JazzCash', fee: '1%' },
    { value: 'easypaisa', label: 'Easypaisa', fee: '1%' },
    { value: 'bank', label: 'Bank Transfer', fee: '2%' },
    { value: 'usdt', label: 'USDT (Crypto)', fee: '3%' }
  ];

  const withdrawalHistory = [
    { id: '1', amount: '$200', method: 'JazzCash', status: 'Completed', date: '2024-01-12' },
    { id: '2', amount: '$150', method: 'USDT', status: 'Processing', date: '2024-01-10' },
    { id: '3', amount: '$300', method: 'Bank Transfer', status: 'Completed', date: '2024-01-08' }
  ];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > (user?.balance || 0)) {
      toast({
        title: 'Insufficient balance',
        description: 'You cannot withdraw more than your available balance.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Withdrawal request submitted',
        description: 'Your withdrawal is being processed and will be completed within 24 hours.'
      });
      setAmount('');
      setMethod('');
      setWalletAddress('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="text-muted-foreground">
          Withdraw your profits • Available Balance: ${user?.balance?.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Withdrawal Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Withdrawal Method</label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose withdrawal method" />
                    </SelectTrigger>
                    <SelectContent>
                      {withdrawalMethods.map((wm) => (
                        <SelectItem key={wm.value} value={wm.value}>
                          {wm.label} ({wm.fee} fee)
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
                    max={user?.balance}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum withdrawal: $10
                  </p>
                </div>

                {method && (
                  <div>
                    <label className="text-sm font-medium">
                      {method === 'usdt' ? 'USDT Wallet Address' : 
                       method === 'bank' ? 'Bank Account Number' : 
                       'Phone Number'}
                    </label>
                    <Input
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder={
                        method === 'usdt' ? 'Enter USDT wallet address' :
                        method === 'bank' ? 'Enter bank account number' :
                        'Enter phone number'
                      }
                      required
                    />
                  </div>
                )}

                {amount && method && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Withdrawal Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>${amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee:</span>
                        <span>-${(parseFloat(amount) * 0.02).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>You will receive:</span>
                        <span>${(parseFloat(amount) * 0.98).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !method || !amount || !walletAddress}
                >
                  {loading ? 'Processing...' : 'Submit Withdrawal Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Processing Times</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>JazzCash: 2-6 hours</p>
                  <p>Easypaisa: 2-6 hours</p>
                  <p>Bank Transfer: 1-3 business days</p>
                  <p>USDT: 30 minutes - 2 hours</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Withdrawal Limits</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Minimum: $10</p>
                  <p>Maximum: $5,000 per day</p>
                  <p>Monthly Limit: $50,000</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Important Notes</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Withdrawals are processed 24/7</p>
                  <p>• KYC verification required</p>
                  <p>• Contact support for assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
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
                {withdrawalHistory.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b">
                    <td className="py-2">{withdrawal.id}</td>
                    <td className="py-2">{withdrawal.amount}</td>
                    <td className="py-2">{withdrawal.method}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        withdrawal.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className="py-2">{withdrawal.date}</td>
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

export default WithdrawPage;
