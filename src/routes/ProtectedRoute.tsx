import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IRootState } from '../types/globalTypes';

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const currentUser = useSelector(
    (state: IRootState) => state.global.currentUser
  );

  if (!currentUser) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  return element; // Return the element that should be rendered
};

export default ProtectedRoute;
