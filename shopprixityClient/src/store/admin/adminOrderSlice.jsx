import { createSlice } from "@reduxjs/toolkit";
import fetchAllOrdersService from "@/services/admin/order/fetchAllOrdersService";
import fetchAdminOrderDetailsService from "@/services/admin/order/fetchAdminOrderDetailsService";
import updateOrderStatusService from "@/services/admin/order/updateOrderStatusService";

const initialState = {
  isLoading: false,
  ordersList: [],
  orderDetails: null,
};

const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action?.payload?.orders;
      })
      .addCase(fetchAllOrdersService.rejected, (state) => {
        state.isLoading = false;
        state.ordersList = [];
      })
      .addCase(fetchAdminOrderDetailsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminOrderDetailsService.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action?.payload from AdminOrderSlice : ", action?.payload);
        state.orderDetails = action?.payload?.order;
      })
      .addCase(fetchAdminOrderDetailsService.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatusService.pending, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatusService.fulfilled, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatusService.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
