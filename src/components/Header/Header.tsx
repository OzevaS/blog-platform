import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import classNames from './Header.module.scss';

const Header = () => {
  const isAuth = useAuth();

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
          <Link to="articles/new" className={classNames['button-create-article']}>Create article</Link>
        </li>
        <li className={classNames['header__user-item']}>
          <Link to="/profile" className={classNames['button-profile']}>NickName</Link>
        </li>
        <li className={classNames['header__user-item']}>
          <Link to="/logout" className={classNames['button-log-out']}>Logout</Link>
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
