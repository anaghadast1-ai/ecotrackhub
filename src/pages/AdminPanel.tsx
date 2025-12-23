import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/admin/UserManagement';
import { PanchayatData } from '@/components/admin/PanchayatData';
import { ReportExport } from '@/components/admin/ReportExport';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Redirect non-admin users
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage users, view panchayat data, and export reports</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="panchayats">Panchayat Data</TabsTrigger>
            <TabsTrigger value="reports">Export Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="panchayats">
            <PanchayatData />
          </TabsContent>

          <TabsContent value="reports">
            <ReportExport />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
