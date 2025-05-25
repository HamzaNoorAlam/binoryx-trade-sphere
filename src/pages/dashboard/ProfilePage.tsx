
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    country: '',
    address: ''
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile information has been saved.'
      });
      setLoading(false);
    }, 1000);
  };

  const handleKYCUpload = () => {
    toast({
      title: 'KYC Documents',
      description: 'KYC verification process will be implemented in the next update.'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={profileData.country}
                    onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                    placeholder="Enter your country"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    placeholder="Enter your address"
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>

              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>

              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Status */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Verified</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Phone Verified</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>KYC Status</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  Not Verified
                </span>
              </div>

              <Button className="w-full" onClick={handleKYCUpload}>
                Complete KYC Verification
              </Button>
            </CardContent>
          </Card>

          {/* KYC Documents */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>KYC Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Identity Document</label>
                <Input type="file" accept="image/*,.pdf" />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload passport or national ID
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Proof of Address</label>
                <Input type="file" accept="image/*,.pdf" />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload utility bill or bank statement
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Selfie with ID</label>
                <Input type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a selfie holding your ID
                </p>
              </div>

              <Button variant="outline" className="w-full">
                Submit Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
