
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminDeposits = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const deposits = [
    {
      id: '1',
      user: 'john@example.com',
      amount: 500.00,
      method: 'JazzCash',
      status: 'Pending',
      screenshot: '/placeholder-screenshot.jpg',
      timestamp: '2024-01-15 14:30:15',
      notes: ''
    },
    {
      id: '2',
      user: 'sarah@example.com',
      amount: 200.00,
      method: 'USDT',
      status: 'Approved',
      screenshot: '/placeholder-screenshot.jpg',
      timestamp: '2024-01-15 13:45:22',
      notes: 'Verified payment'
    },
    {
      id: '3',
      user: 'mike@example.com',
      amount: 150.00,
      method: 'Easypaisa',
      status: 'Rejected',
      screenshot: '/placeholder-screenshot.jpg',
      timestamp: '2024-01-15 12:20:18',
      notes: 'Invalid screenshot'
    },
    {
      id: '4',
      user: 'emma@example.com',
      amount: 300.00,
      method: 'Bank Transfer',
      status: 'Pending',
      screenshot: '/placeholder-screenshot.jpg',
      timestamp: '2024-01-15 11:15:45',
      notes: ''
    }
  ];

  const handleApprove = (depositId: string) => {
    console.log(`Approve deposit ${depositId}`);
  };

  const handleReject = (depositId: string) => {
    console.log(`Reject deposit ${depositId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposit Management</h1>
        <p className="text-muted-foreground">Review and approve deposit requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deposit Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">ID</th>
                  <th className="text-left py-3">User</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Method</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Screenshot</th>
                  <th className="text-left py-3">Time</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit) => (
                  <tr key={deposit.id} className="border-b">
                    <td className="py-3">{deposit.id}</td>
                    <td className="py-3">{deposit.user}</td>
                    <td className="py-3">${deposit.amount.toFixed(2)}</td>
                    <td className="py-3">{deposit.method}</td>
                    <td className="py-3">
                      <Badge 
                        variant={
                          deposit.status === 'Approved' ? 'default' : 
                          deposit.status === 'Rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {deposit.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Payment Screenshot</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <img 
                              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
                              alt="Payment Screenshot"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="py-3 text-sm">{deposit.timestamp}</td>
                    <td className="py-3">
                      {deposit.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(deposit.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(deposit.id)}
                          >
                            Reject
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

export default AdminDeposits;
