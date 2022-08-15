import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

import Layout from '../Layout';
import ArticlesPage from '../../pages/ArticlesPage';
import SingleArticlePage from '../../pages/SingleArticlePage';
import EditArticlePage from '../../pages/EditArticlePage';
import CreateArticlePage from '../../pages/CreateArticlePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage';
import 'antd/dist/antd.css';
import './App.module.scss';
import { RequireAuth } from '../../hoc/RequireAuth';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch } from '../../hooks/redux';
import { UserAuthorized } from '../../hoc/UserAuthorized';

export const App = () => {
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<SingleArticlePage />} />
          <Route
            path="articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="articles/new"
            element={
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="login"
            element={
              <UserAuthorized>
                <LoginPage />
              </UserAuthorized>
            }
          />
          <Route
            path="register"
            element={
              <UserAuthorized>
                <RegisterPage />
              </UserAuthorized>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
