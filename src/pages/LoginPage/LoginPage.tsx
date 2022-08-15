import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import classNames from '../../forms/formSection.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser } from '../../store/asyncActionCreators/UserActions';
import { useAuth } from '../../hooks/useAuth';
import { useFromPage } from '../../hooks/useFromPage';
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
  const errors = { ...formErrors };

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorLogin());
    };
  }, []);

  return (
    <section className={classNames.formSection}>
      <h1 className={classNames.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Email" className={classNameFormGroup(errors.email)}>
          Email
          <input {...register('email')} id="email" placeholder="Email" />
          {formErrors?.email && <p>{formErrors.email.message}</p>}
        </label>
        <label htmlFor="Password" className={classNameFormGroup(errors.password)}>
          Password
          <input {...register('password')} type="password" id="password" placeholder="Password" />
          {formErrors?.password && <p>{formErrors.password.message}</p>}
          {loginError && <span className={classNames.errorMessage}>Email or password is invalid</span>}
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
