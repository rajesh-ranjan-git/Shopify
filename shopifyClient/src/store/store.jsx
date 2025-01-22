import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductsReducer from "./admin/productsSlice";
import shopProductsReducer from "./shop/productsSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminProductsReducer: adminProductsReducer,
    shopProductsReducer: shopProductsReducer,
  },
});

export default store;
