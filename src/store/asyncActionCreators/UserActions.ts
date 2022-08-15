import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserEditRequest, IUserLoginRequest, IUserLoginResponse, IUserRegisterRequest } from '../../types/User';
import axiosApiInstance from '../../axiosApiInstance';
import { IArticle } from '../../types/Article';

export const loginUser = createAsyncThunk('user/login', async (params: IUserLoginRequest, thunkAPI) => {
  try {
    const response = await axiosApiInstance.post<IUserLoginResponse>('/users/login', {
      user: {
        email: params.email,
        password: params.password,
      },
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (response.data.user?.token) {
      localStorage.setItem('token', response.data.user.token);
    }
    return response.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Не удалось войти в систему');
  }
});

export const registerUser = createAsyncThunk('user/register', async (params: IUserRegisterRequest, thunkAPI) => {
  try {
    const response = await axiosApiInstance.post<IUserLoginResponse>('/users', {
      user: {
        email: params.email,
        password: params.password,
        username: params.username,
      },
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (response.data.user?.token) {
      localStorage.setItem('token', response.data.user.token);
    }
    return response.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Не удалось зарегистрироваться в системе');
  }
});

export const updateUser = createAsyncThunk('user/edit', async (params: IUserEditRequest, thunkAPI) => {
  try {
    console.log('params', params);
    const response = await axiosApiInstance.put<IUserLoginResponse>('/user', {
      user: {
        ...params,
      },
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error: any) {
    console.log('updateerror', error);
    return thunkAPI.rejectWithValue('Не удалось обновить данные пользователя');
  }
});