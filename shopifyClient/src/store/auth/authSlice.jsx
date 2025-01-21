import { createSlice } from "@reduxjs/toolkit";
import checkAuthService from "@/services/auth/checkAuthService";
import registerUserService from "@/services/auth/registerUserService";
import loginUserService from "@/services/auth/loginUserService";
import logoutUserService from "@/services/auth/logoutUserService";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthService.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
      })
      .addCase(checkAuthService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(registerUserService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserService.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
      })
      .addCase(registerUserService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(loginUserService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserService.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
      })
      .addCase(loginUserService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutUserService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserService.fulfilled, (state, action) => {
        state.user = action.payload.success ? null : state.user;
        state.isAuthenticated = action.payload.success
          ? false
          : state.isAuthenticated;
        state.isLoading = false;
      })
      .addCase(logoutUserService.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
