import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://blog.kata.academy/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { userReducer: { user: { token: string } } }).userReducer.user?.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
