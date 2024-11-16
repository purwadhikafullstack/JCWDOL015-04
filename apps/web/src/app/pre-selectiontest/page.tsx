'use client'
import React from 'react';
import PreSelectionTest from './components/selectiontest';
import ProtectedRoute from '@/components/ProtectedRoute';


const HomePage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="admin">
    <div>
      <PreSelectionTest/>
    </div>
    </ProtectedRoute>
  );
};

export default HomePage;
