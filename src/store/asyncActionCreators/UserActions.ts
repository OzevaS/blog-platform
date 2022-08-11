import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUserLoginRequest, IUserLoginResponse, IUserRegisterRequest } from '../../types/User';

export const loginUser = createAsyncThunk('user/login', async (params: IUserLoginRequest, thunkAPI) => {
  const response = await axios.post<IUserLoginResponse>('https://blog.kata.academy/api/users/login', {
    user: {
      email: params.email,
      password: params.password,
    },
  });
  return response.data.user;
});

export const registerUser = createAsyncThunk('user/register', async (params: IUserRegisterRequest, thunkAPI) => {
  const response = await axios.post<IUserLoginResponse>('https://blog.kata.academy/api/users', {
    user: {
      email: params.email,
      password: params.password,
      username: params.username,
    },
  });
  return response.data.user;
});
