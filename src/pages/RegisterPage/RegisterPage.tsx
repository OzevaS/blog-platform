import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from '../../forms/formSection.module.scss';
import { formConfirm, formEmail, formPassword, formUsername, formPasswordConfirm } from '../../forms/useFormTemplates';
import { useAppDispatch } from '../../hooks/redux';
import { IUserRegisterRequest } from '../../types/User';
import { handleFormErrors } from '../../forms/checkForm';
import { loginUser, registerUser } from '../../store/asyncActionCreators/UserActions';

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState<IUserRegisterRequest | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    dispatch(registerUser(data));
    navigate('/');
  };

  const refForm = useRef<HTMLFormElement>(null);
  handleFormErrors(errors, refForm.current as HTMLFormElement);

  return (
    <section className={classNames.formSection}>
      <form ref={refForm} className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classNames.title}>Create new account</h1>
        <label htmlFor="Username" className={classNames.formGroup}>
          Username
          <input {...formUsername('username', register)} id="name" placeholder="Username" />
        </label>
        <label htmlFor="Email" className={classNames.formGroup}>
          Email
          <input {...formEmail('email', register)} placeholder="Email" />
        </label>
        <label htmlFor="Password" className={classNames.formGroup}>
          Password
          <input {...formPassword('password', register)} id="password" placeholder="Password" />
        </label>
        <label htmlFor="ConfirmPassword" className={classNames.formGroup}>
          Confirm password
          <input
            {...formPasswordConfirm('passwordConfirm', watch('password') as unknown as string, register)}
            id="confirmPassword"
            placeholder="Confirm password"
          />
        </label>
        <div className={classNames.formGroup}>
          <label htmlFor="confirm" className={classNames.confirm}>
            <input {...formConfirm('confirm', register)} type="checkbox" id="confirm" />I agree to the processing of my
            personal information
            <span className={classNames.checkmark} />
          </label>
        </div>
        <button type="submit" className={classNames.submit}>
          Create
        </button>
        <p className={classNames.tooltip}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
