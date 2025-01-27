import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "../../apiUrls";

const createOrderService = createAsyncThunk(
  "/order/createOrder",
  async ({ orderData }) => {
    try {
      const addToShopCartResponse = await axios.post(
        createOrderApi,
        orderData,
        {
          withCredentials: true,
        }
      );

      console.log("addToShopCartResponse : ", addToShopCartResponse);
      return addToShopCartResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default createOrderService;
