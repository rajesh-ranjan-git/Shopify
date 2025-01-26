import { createSlice } from "@reduxjs/toolkit";
import fetchAllProductsService from "@/services/admin/fetchAllProductsService";

const initialState = {
  isLoading: false,
  productList: [],
};

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProductsService.fulfilled, (state, action) => {
        state.productList = action.payload.products;
        state.isLoading = false;
      })
      .addCase(fetchAllProductsService.rejected, (state) => {
        state.productList = [];
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer;
