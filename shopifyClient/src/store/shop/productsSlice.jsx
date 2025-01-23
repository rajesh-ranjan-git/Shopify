import { createSlice } from "@reduxjs/toolkit";
import fetchAllShopProductsService from "@/services/shop/fetchAllShopProducts";
import fetchShopProductDetails from "@/services/shop/fetchShopProductDetails";

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
      })
      .addCase(fetchShopProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShopProductDetails.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        console.log("action.payload.product : ", action.payload.product);
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
