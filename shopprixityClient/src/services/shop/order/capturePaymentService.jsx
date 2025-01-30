import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { capturePaymentServiceApi } from "../../apiUrls";

const capturePaymentService = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const capturePaymentResponse = await axios.post(
        capturePaymentServiceApi,
        { paymentId: paymentId, payerId: payerId, orderId: orderId },
        {
          withCredentials: true,
        }
      );

      return capturePaymentResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default capturePaymentService;
