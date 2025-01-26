import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductsReducer from "./admin/productsSlice";
import shopProductsReducer from "./shop/productsSlice";
import shopCartReducer from "./shop/cartSlice";
import addressReducer from "./shop/addressSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminProductsReducer: adminProductsReducer,
    shopProductsReducer: shopProductsReducer,
    shopCartReducer: shopCartReducer,
    addressReducer: addressReducer,
  },
});

export default store;
