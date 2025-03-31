
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element,
  requireAdmin = false
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Store the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin access is required but user is not an admin, redirect to home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component
  return <>{element}</>;
};

export default ProtectedRoute;
