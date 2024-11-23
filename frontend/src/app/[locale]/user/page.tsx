'use client';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import LoadingPage from './loading';
// const DashboardContent = lazy(() => import("./components/DashboardContent")); 

const UserDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingPage/>;

  return (
    <Suspense >
        <h1>Hi</h1>
    </Suspense>
  );
};

export default UserDashboard;
