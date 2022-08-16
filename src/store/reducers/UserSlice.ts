import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, UserEditError, UserLoginError, UserRegisterError } from '../../types/User';
import { updateUser, loginUser, registerUser } from '../asyncActionCreators/UserActions';

interface UserState {
  user: IUser | null;
  isAuth: boolean;
  error: {
    login: UserLoginError | null;
    register: UserRegisterError | null;
    edit: UserEditError | null;
  };
  profileUpdated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: {
    login: null,
    register: null,
    edit: null,
  },
  profileUpdated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    clearErrorLogin: (state) => {
      state.error.login = null;
    },
    clearErrorRegister: (state) => {
      state.error.register = null;
    },
    clearErrorEditProfile: (state) => {
      state.error.edit = null;
    },
    clearSuccessEditProfile: (state) => {
      state.profileUpdated = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    [loginUser.pending.type]: (state) => {
      state.error.login = null;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<UserLoginError>) => {
      state.isAuth = false;
      state.error.login = action.payload;
    },

    [registerUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    [registerUser.pending.type]: (state) => {
      state.error.register = null;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<UserRegisterError>) => {
      state.isAuth = false;
      state.error.register = action.payload;
    },

    [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.profileUpdated = true;
    },
    [updateUser.pending.type]: (state) => {
      state.error.edit = null;
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<UserEditError>) => {
      state.error.edit = action.payload;
    },
  },
});

export default userSlice.reducer;
