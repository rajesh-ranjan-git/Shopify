import { registerUserService } from "@/services/auth/registerUserService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(registerUserService.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(registerUserService.fulfilled, (state, action) => {
  //       state.user = null;
  //       state.isAuthenticated = false;
  //       state.isLoading = false;
  //     })
  //     .addCase(registerUserService.rejected, (state, action) => {
  //       state.user = null;
  //       state.isAuthenticated = false;
  //       state.isLoading = false;
  //     });
  // },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
