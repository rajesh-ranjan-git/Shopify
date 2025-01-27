import { createSlice } from "@reduxjs/toolkit";
import createOrderService from "@/services/shop/order/createOrderService";

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,
};

const OrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderService.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createOrderService.fulfilled, (state, action) => {
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        state.isLoading = false;
      }),
      builder.addCase(createOrderService.rejected, (state) => {
        state.approvalURL = null;
        state.orderId = null;
        state.isLoading = false;
      });
  },
});

export default OrderSlice.reducer;
