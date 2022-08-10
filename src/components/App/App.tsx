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

export const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<SingleArticlePage />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
          <Route path="articles/new" element={<CreateArticlePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
