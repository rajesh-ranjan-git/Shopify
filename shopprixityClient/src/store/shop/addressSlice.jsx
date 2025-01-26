import { createSlice } from "@reduxjs/toolkit";
import fetchAddressService from "@/services/shop/address/fetchAddressService";
import addAddressService from "@/services/shop/address/addAddressService";
import updateAddressService from "@/services/shop/address/updateAddressService";
import deleteAddressService from "@/services/shop/address/deleteAddressService";

const initialState = {
  isLoading: false,
  addressList: [],
};

const AddressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddressService.fulfilled, (state, action) => {
        state.addressList = action?.payload?.addressList;
        state.isLoading = false;
      })
      .addCase(fetchAddressService.rejected, (state) => {
        state.addressList = [];
        state.isLoading = false;
      })
      .addCase(addAddressService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddressService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddressService.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAddressService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressService.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateAddressService.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddressService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressService.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAddressService.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AddressSlice.reducer;
