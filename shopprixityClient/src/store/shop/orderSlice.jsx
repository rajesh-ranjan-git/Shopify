import { createSlice } from "@reduxjs/toolkit";
import createOrderService from "@/services/shop/order/createOrderService";
import fetchAllOrdersByUserService from "@/services/shop/order/fetchAllOrdersByUserService";
import fetchOrderDetailsService from "@/services/shop/order/fetchOrderDetailsService";

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,
  ordersList: [],
  orderDetails: null,
};

const OrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderService.fulfilled, (state, action) => {
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        state.isLoading = false;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrderService.rejected, (state) => {
        state.approvalURL = null;
        state.orderId = null;
        state.isLoading = false;
        sessionStorage.removeItem("currentOrderId");
      })
      .addCase(fetchAllOrdersByUserService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersByUserService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload.data;
      })
      .addCase(fetchAllOrdersByUserService.rejected, (state) => {
        state.isLoading = false;
        state.ordersList = [];
      })
      .addCase(fetchOrderDetailsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetailsService.fulfilled, (state) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(fetchOrderDetailsService.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = OrderSlice.actions;
export default OrderSlice.reducer;
