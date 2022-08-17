import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface UserAuthorizedProps {
  children: JSX.Element;
}

export const UserAuthorized: FC<UserAuthorizedProps> = ({ children }) => {
  const isAuth = useAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};
