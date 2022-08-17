import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';

import classNames from '../../forms/formSection.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser } from '../../store/asyncActionCreators/UserActions';
import { userSlice } from '../../store/reducers/UserSlice';
import { loginSchema } from '../../forms/formSchemas';

interface LoginFormData {
  email: string;
  password: string;
}

const classNameFormGroup = (error: any) => `${error ? classNames['formGroup--error'] : classNames.formGroup}`;

const LoginPage = () => {
  const { handleSubmit, register, formState } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const { clearErrorLogin } = userSlice.actions;
  const { login: loginError } = useAppSelector((state) => state.userReducer.error);
  const { errors: formErrors } = formState;

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorLogin());
    };
  }, []);

  useEffect(() => {
    if (loginError) {
      message.error('Не удалось войти в систему');
    }
  }, [loginError]);

  return (
    <section className={`${classNames.formSection} small-centered-content`} style={{ maxWidth: '384px' }}>
      <h1 className={classNames.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Email" className={classNames.formGroup}>
          Email
          <input {...register('email')} id="email" placeholder="Email" />
          {formErrors?.email && <p>{formErrors.email.message}</p>}
        </label>
        <label
          htmlFor="Password"
          className={classNameFormGroup(formErrors?.password || loginError?.['email or password'])}
        >
          Password
          <input {...register('password')} type="password" id="password" placeholder="Password" />
          {formErrors?.password && <p>{formErrors.password.message}</p>}
          {loginError?.['email or password'] && <p>Email or password is invalid</p>}
        </label>
        <button type="submit" className={classNames.submit}>
          Sign In
        </button>
        <p className={classNames.tooltip}>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
