import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import { userSlice } from '../../store/reducers/UserSlice';

import classNames from './Header.module.scss';

const Header = () => {
  const isAuth = useAuth();
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { logout } = userSlice.actions;

  const onLogout = () => {
    localStorage.setItem('user', '');
    dispatch(logout());
  };

  let userItems = (
    <ul className={classNames.header__user}>
      <li className={classNames['header__user-item']}>
        <Link to="/login" className={classNames['button-sign-in']}>
          Sign in
        </Link>
      </li>
      <li className={classNames['header__user-item']}>
        <Link to="/register" className={classNames['button-sign-up']}>
          Sign up
        </Link>
      </li>
    </ul>
  );

  if (isAuth)
    userItems = (
      <ul className={classNames.header__user}>
        <li className={classNames['header__user-item']}>
          <Link to="articles/new" className={classNames['button-create-article']}>
            Create article
          </Link>
        </li>
        <li className={classNames['header__user-item']}>
          <Link to="/profile" className={classNames['header__link-profile']}>
            <p className={classNames.header__username}>{user?.username}</p>
            <img
              src={user?.image || './static/avatar.svg'}
              alt={user?.username}
              className={classNames['header__user-avatar']}
            />
          </Link>
        </li>
        <li className={classNames['header__user-item']}>
          <button onClick={onLogout} type="button" className={classNames['button-log-out']}>
            Logout
          </button>
        </li>
      </ul>
    );

  return (
    <header className={classNames.header}>
      <Link to="/" className={classNames.header__home}>
        Realworld Blog
      </Link>
      {userItems}
    </header>
  );
};

export default Header;
