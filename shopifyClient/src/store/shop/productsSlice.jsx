import { createSlice } from "@reduxjs/toolkit";
import fetchAllShopProductsService from "@/services/shop/fetchAllShopProducts";

const initialState = {
  isLoading: false,
  shopProductList: [],
};

const ShopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShopProductsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShopProductsService.fulfilled, (state, action) => {
        state.shopProductList = action.payload.products;
        state.isLoading = false;
      })
      .addCase(fetchAllShopProductsService.rejected, (state) => {
        state.shopProductList = [];
        state.isLoading = false;
      });
  },
});

export default ShopProductsSlice.reducer;
