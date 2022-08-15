import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IUserLoginRequest, IUserLoginResponse } from '../types/User';

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    loginUser: build.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (params) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email: params.email,
            password: params.password,
          },
        },
      }),
    }),
    registerUser: build.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (params) => ({
        url: '/users',
        method: 'POST',
        params: { user: params },
      }),
    }),
    updateUser: build.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (params) => ({
        url: '/users',
        method: 'PUT',
        params: { user: params },
      }),
    }),
  }),
});
