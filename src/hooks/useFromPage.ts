import { useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

export interface LocationState {
  from: {
    pathname: Location;
  };
}

export const useFromPage = (isAuth: boolean) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { from } = location.state as LocationState || { from: { pathname: '/' } };
    
  useEffect(() => {
    console.log('from', from);
    if (isAuth && from) {
      navigate(from.pathname);
    }
  }, [isAuth]);
};
