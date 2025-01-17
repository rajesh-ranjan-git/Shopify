import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  iLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
