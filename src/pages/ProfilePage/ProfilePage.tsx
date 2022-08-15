/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classNames from '../../forms/formSection.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUser } from '../../store/asyncActionCreators/UserActions';
import { editProfileSchema } from '../../forms/formSchemas';
import { userSlice } from '../../store/reducers/UserSlice';

const classNameFormGroup = (error: any) => `${error ? classNames['formGroup--error'] : classNames.formGroup}`;

interface EditProfileFormData {
  username: string;
  email: string;
  password: string;
  image: string;
}

const ProfilePage = () => {
  const { handleSubmit, register, formState } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema),
  });
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { clearErrorEditProfile } = userSlice.actions;
  const { errors: formErrors } = formState;
  const { edit: editError } = useAppSelector((state) => state.userReducer.error);
  const errors = { ...formErrors, ...editError };

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    const dataFormatted: any = {};
    for (const key in data)
      if (data[key] !== '') {
        dataFormatted[key] = data[key];
      }
    dispatch(updateUser({ ...dataFormatted, token: user?.token }));
  });

  console.log('editError', editError);

  useEffect(() => {
    return () => {
      dispatch(clearErrorEditProfile());
    };
  }, []);

  return (
    <section className={classNames.formSection}>
      <h1 className={classNames.title}>Edit Profile</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="Username" className={classNameFormGroup(errors.username)}>
          Username
          <input {...register('username')} type="text" id="name" placeholder="Username" defaultValue={user?.username} />
          {formErrors?.username && <p>{formErrors.username.message}</p>}
          {editError?.username && <p>{editError.username}</p>}
        </label>
        <label htmlFor="Email" className={classNameFormGroup(errors.email)}>
          Email address
          <input {...register('email')} id="email" placeholder="Email" defaultValue={user?.email} />
          {formErrors?.email && <p>{formErrors.email.message}</p>}
          {editError?.email && <p>{editError.email}</p>}
        </label>
        <label htmlFor="Password" className={classNameFormGroup(errors.password)}>
          New password
          <input {...register('password', { required: false })} type="password" id="password" placeholder="Password" />
          {formErrors?.password && <p>{formErrors.password.message}</p>}
        </label>
        <label htmlFor="Avatar" className={classNameFormGroup(errors.image)}>
          Avatar image(url)
          <input {...register('image')} type="text" id="avatar" placeholder="Avatar image" defaultValue={user?.image} />
          {formErrors?.image && <p>{formErrors.image.message}</p>}
        </label>
        <button type="submit" className={classNames.submit}>
          Save
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
