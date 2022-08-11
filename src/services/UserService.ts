import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IUserRegisterResponse, IUserLoginResponse, IUserLoginRequest, IUserRegisterRequest } from '../types/User';

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
  }),
  endpoints: (build) => ({
    register: build.query<IUserRegisterResponse, IUserRegisterRequest>({
      query: (params) => ({
        url: '/users',
        params: {
          username: params.username,
          email: params.email,
          password: params.password,
        },
      }),
    }),
    login: build.query<IUserLoginResponse, IUserLoginRequest>({
      query: (params) => ({
        url: '/users/login',
        params: {
          email: params.email,
          password: params.password,
        },
      }),
    }),
  }),
});
