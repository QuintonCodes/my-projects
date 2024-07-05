import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../utils/api";

interface User {
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: unknown;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const registerUserAsync: AsyncThunk<
  void,
  { username: string; email: string; password: string },
  {
    rejectValue: unknown;
    state: AuthState;
  }
> = createAsyncThunk(
  "auth/register",
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync: AsyncThunk<
  { user: User; accessToken: string },
  { email: string; password: string },
  { rejectValue: unknown; state: AuthState }
> = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(
        loginUserAsync.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      // Handle registration
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(
        registerUserAsync.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const authActions: {
  registerUserAsync: typeof registerUserAsync;
  loginUserAsync: typeof loginUserAsync;
  logout: typeof logout;
} = {
  registerUserAsync,
  loginUserAsync,
  logout,
} as const;
