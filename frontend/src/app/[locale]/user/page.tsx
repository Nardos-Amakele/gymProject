'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import LoadingPage from './loading';
const DashboardContent = lazy(() => import("./components/UserDashBoardContent")); 

const UserDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingPage/>;

  return (
    <Suspense >
        <DashboardContent />
    </Suspense>
  );
};

export default UserDashboard;
