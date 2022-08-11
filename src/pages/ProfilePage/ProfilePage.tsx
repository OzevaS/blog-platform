/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { handleFormErrors } from '../../forms/checkForm';
import classNames from '../../forms/formSection.module.scss';
import { formEmail, formPassword, formUsername, formURL } from '../../forms/useFormTemplates';

const ProfilePage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    for (const value of Object.values(data)) {
      const { ref, message } = value;
    }
  });

  const refForm = useRef<HTMLFormElement>(null);
  handleFormErrors(errors, refForm.current as HTMLFormElement);

  return (
    <section className={classNames.formSection}>
      <h1 className={classNames.title}>Edit Profile</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="Username" className={classNames.formGroup}>
          Username
          <input {...formUsername('username', register)} type="text" id="name" placeholder="Username" />
        </label>
        <label htmlFor="Email" className={classNames.formGroup}>
          Email address
          <input {...formEmail('email', register)} id="email" placeholder="Email" />
        </label>
        <label htmlFor="Password" className={classNames.formGroup}>
          New password
          <input {...formPassword('password', register)} type="password" id="password" placeholder="Password" />
        </label>
        <label htmlFor="Avatar" className={classNames.formGroup}>
          Avatar image(url)
          <input {...formURL('avatarURL', register)} type="text" id="avatar" placeholder="Avatar image" />
        </label>
        <button type="submit" className={classNames.submit}>
          Edit
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
