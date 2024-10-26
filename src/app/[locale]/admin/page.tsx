'use client';
import React, { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSideBar';
import DashboardContent from './components/DashboardContent';
import Employee from './components/Employee';
import GymMember from './components/GymMember';
import Inventory from './components/Inventory';

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
          {selectedTab === "Dashboard" && <DashboardContent />}
          {selectedTab === "Gym Member" && <GymMember />}
          {selectedTab === "Employee" && <Employee />}
          {selectedTab === "Inventory" && <Inventory />}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
