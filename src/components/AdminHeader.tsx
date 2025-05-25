
const AdminHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Platform Management
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
