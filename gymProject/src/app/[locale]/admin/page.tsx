'use client';
import React, { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import DashboardContent from './components/DashboardContent';
import GymMember from './components/GymMember';
import Inventory from './inventory/Inventory';
import Stock from './components/Stock';
import Orders from './components/Orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FinancialReport } from './components/FinancialReport';
import Services from './components/Services';
import AdminSidebar from './components/AdminSideBar';

const AdminDashboard: React.FC = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen flex">
      {/* Burger Icon for Mobile */}
      <button
        className="lg:hidden p-4 z-10"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'fixed' : 'hidden'
        } fixed top-0 left-0 h-full bg-black lg:relative lg:flex lg:h-auto z-20`}
      >
        <AdminSidebar locale={''} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 bg-black p-6 overflow-auto">
          {/* Here you might want to implement a way to show the selected tab's content based on the route */}
          <DashboardContent />
        </main>
      </div>
      
      {/* Overlay Background for Sidebar (when open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
