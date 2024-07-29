import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: { id: string; name: string; email: string };
      }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        user: { id: string; name: string; email: string };
      }>
    ) => {
      state.user = { ...state.user, ...action.payload.user };
      state.isAuthenticated = true;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, updateUser, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
