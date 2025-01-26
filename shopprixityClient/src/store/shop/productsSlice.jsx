import { createSlice } from "@reduxjs/toolkit";
import fetchShopProductsService from "@/services/shop/products/fetchShopProductsService";
import fetchShopProductDetails from "@/services/shop/products/fetchShopProductDetailsService";

const initialState = {
  isLoading: false,
  shopProductList: [],
  shopProductDetails: null,
};

const ShopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProductsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopProductsService.fulfilled, (state, action) => {
        state.shopProductList = action.payload.products;
        state.isLoading = false;
      })
      .addCase(fetchShopProductsService.rejected, (state) => {
        state.shopProductList = [];
        state.isLoading = false;
      })
      .addCase(fetchShopProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopProductDetails.fulfilled, (state, action) => {
        state.shopProductDetails = action.payload.product;
        state.isLoading = false;
      })
      .addCase(fetchShopProductDetails.rejected, (state) => {
        state.shopProductDetails = null;
        state.isLoading = false;
      });
  },
});

export default ShopProductsSlice.reducer;
