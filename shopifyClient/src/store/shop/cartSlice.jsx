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
      .addCase(fetchShopCartService.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopCartService.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(addToShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToShopCartService.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(addToShopCartService.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShopCartService.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShopCartService.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartService.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartService.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default ShopCartSlice.reducer;
