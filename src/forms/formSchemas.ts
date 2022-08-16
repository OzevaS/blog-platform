/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be less than 20 characters long'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(40, 'Password must be less than 40 characters long'),
  passwordConfirm: yup
    .string()
    .required('Password repeat is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  confirm: yup.bool().oneOf([true], 'Confirm is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

export const editProfileSchema = yup.object().shape(
  {
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be less than 20 characters long'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (val: any) => val?.length,
        then: (rule) =>
          rule
            .min(6, 'Password must be at least 6 characters long')
            .max(40, 'Password must be less than 40 characters long'),
      }),
    imageUrl: yup.string().url('Invalid image URL'),
  },
  [['password', 'password']]
);

export const articleFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  body: yup.string().required('Body is required'),
});
