import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
