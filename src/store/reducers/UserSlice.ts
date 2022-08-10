import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/User';

interface UserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState = {
  user: {},
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export default userSlice.reducer;
