'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import LoadingPage from './loading';
const DashboardContent = lazy(() => import("./components/DashboardContent")); 

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Suspense fallback={<LoadingPage />}>
      <DashboardContent />
    </Suspense>
  );
};

export default AdminDashboard;
