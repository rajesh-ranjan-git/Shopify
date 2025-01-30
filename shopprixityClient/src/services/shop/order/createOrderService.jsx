import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "../../apiUrls";

const createOrderService = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    try {
      const createOrderResponse = await axios.post(createOrderApi, orderData, {
        withCredentials: true,
      });

      return createOrderResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default createOrderService;
