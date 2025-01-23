import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductsReducer from "./admin/productsSlice";
import shopProductsReducer from "./shop/productsSlice";
import shopCartReducer from "./shop/cartSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminProductsReducer: adminProductsReducer,
    shopProductsReducer: shopProductsReducer,
    shopCartReducer: shopCartReducer,
  },
});

export default store;
