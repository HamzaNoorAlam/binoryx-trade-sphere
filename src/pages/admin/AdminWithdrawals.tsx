
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const AdminWithdrawals = () => {
  const [notes, setNotes] = useState<{[key: string]: string}>({});

  const withdrawals = [
    {
      id: '1',
      user: 'john@example.com',
      amount: 200.00,
      method: 'JazzCash',
      walletInfo: '+923001234567',
      status: 'Pending',
      timestamp: '2024-01-15 16:30:15'
    },
    {
      id: '2',
      user: 'sarah@example.com',
      amount: 350.00,
      method: 'USDT',
      walletInfo: 'TYDzsqo5xQ2Z8KGWmhZc...',
      status: 'Approved',
      timestamp: '2024-01-15 15:45:22'
    },
    {
      id: '3',
      user: 'mike@example.com',
      amount: 150.00,
      method: 'Bank Transfer',
      walletInfo: 'ACC: 1234567890123',
      status: 'Rejected',
      timestamp: '2024-01-15 14:20:18'
    },
    {
      id: '4',
      user: 'emma@example.com',
      amount: 275.00,
      method: 'Easypaisa',
      walletInfo: '+923007654321',
      status: 'Pending',
      timestamp: '2024-01-15 13:15:45'
    }
  ];

  const handleApprove = (withdrawalId: string) => {
    console.log(`Approve withdrawal ${withdrawalId}`);
    console.log(`Notes: ${notes[withdrawalId] || 'No notes'}`);
  };

  const handleReject = (withdrawalId: string) => {
    console.log(`Reject withdrawal ${withdrawalId}`);
    console.log(`Notes: ${notes[withdrawalId] || 'No notes'}`);
  };

  const handleNotesChange = (withdrawalId: string, value: string) => {
    setNotes(prev => ({ ...prev, [withdrawalId]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdrawal Management</h1>
        <p className="text-muted-foreground">Review and process withdrawal requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {withdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Request ID</label>
                    <div className="font-semibold">{withdrawal.id}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">User</label>
                    <div className="font-semibold">{withdrawal.user}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <div className="font-semibold">${withdrawal.amount.toFixed(2)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div>
                      <Badge 
                        variant={
                          withdrawal.status === 'Approved' ? 'default' : 
                          withdrawal.status === 'Rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Method</label>
                    <div className="font-semibold">{withdrawal.method}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Wallet/Account Info</label>
                    <div className="font-mono text-sm bg-muted p-2 rounded">
                      {withdrawal.walletInfo}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-muted-foreground">Request Time</label>
                  <div>{withdrawal.timestamp}</div>
                </div>

                {withdrawal.status === 'Pending' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Admin Notes</label>
                      <Textarea
                        placeholder="Add notes about this withdrawal request..."
                        value={notes[withdrawal.id] || ''}
                        onChange={(e) => handleNotesChange(withdrawal.id, e.target.value)}
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => handleApprove(withdrawal.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve Withdrawal
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(withdrawal.id)}
                      >
                        Reject Withdrawal
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWithdrawals;
