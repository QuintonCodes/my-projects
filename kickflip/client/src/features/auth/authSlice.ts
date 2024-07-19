import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { Login, Register, User } from "../../utils/models";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async Thunks
export const register = createAsyncThunk<
  void,
  Register,
  { rejectValue: string }
>("auth/register", async (user: Register, thunkAPI) => {
  try {
    await authService.register(user);
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const login = createAsyncThunk<User, Login, { rejectValue: string }>(
  "auth/login",
  async (user: Login, thunkAPI) => {
    try {
      const response = await authService.login(user);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("auth/updateUser", async (userData: Partial<User>, thunkAPI) => {
  try {
    return await authService.updateUser(userData);
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const refreshToken = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const accessToken = await authService.refreshToken();
    return accessToken;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(
        register.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occured";
        }
      )
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occured";
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(
        updateUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occurred";
        }
      )
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.user) {
            state.accessToken = action.payload;
          }
        }
      )
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
