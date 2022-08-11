import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/User';
import { loginUser, registerUser } from '../asyncActionCreators/UserActions';

interface UserState {
  user: IUser | null;
  isAuth: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
    [registerUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
