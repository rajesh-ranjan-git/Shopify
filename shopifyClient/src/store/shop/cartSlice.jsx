import { createSlice } from "@reduxjs/toolkit";
import addToShopCartService from "@/services/shop/cart/addToShopCartService";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";
import updateShopCartService from "@/services/shop/cart/updateShopCartService";
import deleteShopCartService from "@/services/shop/cart/deleteShopCartService";

const initialState = {
  isLoading: false,
  cart: [],
};

const ShopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopCartService.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        console.log("action.payload.data : ", action.payload.data);
        state.cartItems = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchShopCartService.rejected, (state) => {
        state.cartItems = [];
        state.isLoading = false;
      })
      .addCase(addToShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToShopCartService.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        console.log("action.payload.data : ", action.payload.data);
        state.cartItems = action.payload.data;
        state.isLoading = false;
      })
      .addCase(addToShopCartService.rejected, (state) => {
        state.cartItems = [];
        state.isLoading = false;
      })
      .addCase(updateShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShopCartService.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        console.log("action.payload.data : ", action.payload.data);
        state.cartItems = action.payload.data;
        state.isLoading = false;
      })
      .addCase(updateShopCartService.rejected, (state) => {
        state.cartItems = [];
        state.isLoading = false;
      })
      .addCase(deleteShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartService.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        console.log("action.payload.data : ", action.payload.data);
        state.cartItems = action.payload.data;
        state.isLoading = false;
      })
      .addCase(deleteShopCartService.rejected, (state) => {
        state.cartItems = [];
        state.isLoading = false;
      });
  },
});

export default ShopCartSlice.reducer;
