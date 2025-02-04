import { createSlice } from "@reduxjs/toolkit";
import checkAuthService from "@/services/auth/checkAuthService";
import registerUserService from "@/services/auth/registerUserService";
import loginUserService from "@/services/auth/loginUserService";
import logoutUserService from "@/services/auth/logoutUserService";
import googleAuthFirebaseService from "@/services/auth/googleAuthFirebaseService";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
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
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(registerUserService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(loginUserService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserService.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUserService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(logoutUserService.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.isLoading = false;
        localStorage.clear();
      })
      .addCase(googleAuthFirebaseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuthFirebaseService.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(googleAuthFirebaseService.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.token = null;
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
