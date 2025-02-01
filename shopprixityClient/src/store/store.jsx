import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductsReducer from "./admin/productsSlice";
import shopProductsReducer from "./shop/productsSlice";
import shopCartReducer from "./shop/cartSlice";
import addressReducer from "./shop/addressSlice";
import orderReducer from "./shop/orderSlice";
import adminOrderReducer from "./admin/adminOrderSlice";
import reviewsReducer from "./shop/reviewsSlice";
import featuresReducer from "./common/featuresSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,

    adminProductsReducer: adminProductsReducer,

    shopProductsReducer: shopProductsReducer,
    shopCartReducer: shopCartReducer,

    addressReducer: addressReducer,
    orderReducer: orderReducer,

    adminOrderReducer: adminOrderReducer,

    reviewsReducer: reviewsReducer,

    featuresReducer: featuresReducer,
  },
});

export default store;
