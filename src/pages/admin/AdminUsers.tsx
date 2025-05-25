
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Smith',
      balance: 1250.00,
      status: 'Active',
      verified: true,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      email: 'sarah@example.com',
      name: 'Sarah Johnson',
      balance: 850.50,
      status: 'Active',
      verified: false,
      joinDate: '2024-01-14'
    },
    {
      id: '3',
      email: 'mike@example.com',
      name: 'Mike Chen',
      balance: 2100.75,
      status: 'Suspended',
      verified: true,
      joinDate: '2024-01-12'
    },
    {
      id: '4',
      email: 'emma@example.com',
      name: 'Emma Rodriguez',
      balance: 675.25,
      status: 'Active',
      verified: true,
      joinDate: '2024-01-10'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    console.log(`Toggle status for user ${userId}: ${currentStatus}`);
  };

  const handleAdjustBalance = (userId: string) => {
    console.log(`Adjust balance for user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and balances</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">User ID</th>
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Balance</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Verified</th>
                  <th className="text-left py-3">Join Date</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3">{user.id}</td>
                    <td className="py-3">{user.name}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">${user.balance.toFixed(2)}</td>
                    <td className="py-3">
                      <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant={user.verified ? 'default' : 'secondary'}>
                        {user.verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="py-3">{user.joinDate}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusToggle(user.id, user.status)}
                        >
                          {user.status === 'Active' ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdjustBalance(user.id)}
                        >
                          Adjust
                        </Button>
                      </div>
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

export default AdminUsers;
