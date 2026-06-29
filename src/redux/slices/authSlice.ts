import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/loginTypes';

export interface AuthState {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user?: UserData }>) => {
      state.token = action.payload.token;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
