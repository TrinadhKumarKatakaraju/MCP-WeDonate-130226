import { Navigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import React from 'react';

interface ProtectedRouteProps {
  user: User | null;
  userRole: string | null;
  requiredRole: string;
  children: React.ReactElement;
}

const ProtectedRoute = ({ user, userRole, requiredRole, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
