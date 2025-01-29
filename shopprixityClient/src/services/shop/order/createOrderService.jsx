import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "../../apiUrls";

const createOrderService = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    console.log("orderData : ", orderData);
    try {
      const createOrderResponse = await axios.post(createOrderApi, orderData, {
        withCredentials: true,
      });

      console.log("createOrderResponse : ", createOrderResponse);
      return createOrderResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default createOrderService;
