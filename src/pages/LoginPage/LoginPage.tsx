import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

import classNames from '../../forms/formSection.module.scss';
import { formEmail, formPassword } from '../../forms/useFormTemplates';
import { handleFormErrors } from '../../forms/checkForm';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../store/asyncActionCreators/UserActions';

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(loginUser(data));
    navigate('/');
  };

  const refForm = useRef<HTMLFormElement>(null);
  handleFormErrors(errors, refForm.current as HTMLFormElement);

  return (
    <section className={classNames.formSection}>
      <h1 className={classNames.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Email" className={classNames.formGroup}>
          Email
          <input {...formEmail('email', register)} type="email" id="email" placeholder="Email" />
        </label>
        <label htmlFor="Password" className={classNames.formGroup}>
          Password
          <input {...formPassword('password', register)} type="password" id="password" placeholder="Password" />
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
