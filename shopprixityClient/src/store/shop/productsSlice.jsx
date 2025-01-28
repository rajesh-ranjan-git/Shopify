import { createSlice } from "@reduxjs/toolkit";
import fetchShopProductsService from "@/services/shop/products/fetchShopProductsService";
import fetchShopProductDetailsService from "@/services/shop/products/fetchShopProductDetailsService";
import searchShopProductsService from "@/services/shop/products/searchShopProductsService";

const initialState = {
  isLoading: false,
  shopProductList: [],
  shopProductDetails: null,
  searchShopProducts: [],
};

const ShopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    resetSearchShopProducts: (state) => {
      state.searchShopProducts = [];
    },
  },
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
      .addCase(fetchShopProductDetailsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopProductDetailsService.fulfilled, (state, action) => {
        state.shopProductDetails = action.payload.product;
        state.isLoading = false;
      })
      .addCase(fetchShopProductDetailsService.rejected, (state) => {
        state.shopProductDetails = null;
        state.isLoading = false;
      })
      .addCase(searchShopProductsService.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(searchShopProductsService.fulfilled, (state, action) => {
        state.searchShopProducts = action.payload.products;
        state.isLoading = false;
      })
      .addCase(searchShopProductsService.rejected, (state) => {
        state.searchShopProducts = null;
        state.isLoading = false;
      });
  },
});

export const { resetSearchShopProducts } = ShopProductsSlice.actions;
export default ShopProductsSlice.reducer;
