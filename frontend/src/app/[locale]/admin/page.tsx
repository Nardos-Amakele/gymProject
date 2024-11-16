'use client';
import React, { useState } from 'react';
import DashboardContent from './components/DashboardContent';
const AdminDashboard: React.FC = () => {

  return (
    <div className="relative h-screen flex">
          <DashboardContent />
    </div>
  );
};

export default AdminDashboard;
