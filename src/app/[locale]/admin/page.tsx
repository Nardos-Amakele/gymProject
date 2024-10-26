'use client';
import React, { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSideBar';
import DashboardContent from './components/DashboardContent';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const handleNavClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar onNavClick={handleNavClick} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 bg-black p-6 overflow-auto">
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
