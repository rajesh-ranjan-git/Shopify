import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserService } from "@/services/auth/loginUserService";
import { registerUserService } from "@/services/auth/registerUserService";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUserAsyncThunk = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    return await registerUserService(formData);
  }
);

export const loginUserAsyncThunk = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    return await loginUserService(formData);
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
        state.isLoading = false;
      })
      .addCase(registerUserAsyncThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(loginUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
        state.isLoading = false;
      })
      .addCase(loginUserAsyncThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
