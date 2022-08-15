import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classNames from '../../forms/formSection.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser } from '../../store/asyncActionCreators/UserActions';
import { userSlice } from '../../store/reducers/UserSlice';
import { registerSchema } from '../../forms/formSchemas';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  confirm: boolean;
}

const classNameFormGroup = (error: any) => `${error ? classNames['formGroup--error'] : classNames.formGroup}`;

const RegisterPage = () => {
  const { handleSubmit, register, formState } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const dispatch = useAppDispatch();
  const { clearErrorRegister } = userSlice.actions;
  const { register: registerError } = useAppSelector((state) => state.userReducer.error);
  const { errors: formErrors } = formState;
  const errors = { ...formErrors, ...registerError };

  const onSubmit = async (data: any) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorRegister());
    };
  }, []);

  console.log('errors', formErrors);

  return (
    <section className={classNames.formSection}>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classNames.title}>Create new account</h1>
        <label htmlFor="Username" className={classNameFormGroup(errors.username)}>
          Username
          <input {...register('username')} id="name" placeholder="Username" />
          {formErrors?.username && <p>{formErrors.username.message}</p>}
          {registerError?.username && <p>{registerError.username}</p>}
        </label>
        <label htmlFor="Email" className={classNameFormGroup(errors.email)}>
          Email
          <input {...register('email')} placeholder="Email" />
          {formErrors?.email && <p>{formErrors.email.message}</p>}
          {registerError?.email && <p>{registerError.email}</p>}
        </label>
        <label htmlFor="Password" className={classNameFormGroup(errors.password)}>
          Password
          <input {...register('password')} id="password" placeholder="Password" />
          {formErrors?.password && <p>{formErrors.password.message}</p>}
        </label>
        <label htmlFor="ConfirmPassword" className={classNameFormGroup(errors.passwordConfirm)}>
          Confirm password
          <input {...register('passwordConfirm')} id="confirmPassword" placeholder="Confirm password" />
          {formErrors?.passwordConfirm && <p>{formErrors.passwordConfirm.message}</p>}
        </label>
        <div className={classNameFormGroup(errors.confirm)}>
          <label htmlFor="confirm" className={classNames.confirm}>
            <input {...register('confirm')} type="checkbox" id="confirm" />I agree to the processing of my personal
            information
            <p className={classNames.checkmark} />
            {formErrors?.confirm && <p>{formErrors.confirm.message}</p>}
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
