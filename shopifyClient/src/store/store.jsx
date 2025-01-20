import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductsReducer from "./admin/productsSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminProductsReducer: adminProductsReducer,
  },
});

export default store;
