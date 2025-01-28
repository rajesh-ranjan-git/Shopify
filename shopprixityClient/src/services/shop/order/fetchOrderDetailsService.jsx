import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetailsServiceApi } from "../../apiUrls";

const fetchOrderDetailsService = createAsyncThunk(
  "/order/orderDetails",
  async (orderId) => {
    try {
      const fetchOrderDetailsResponse = await axios.get(
        `${fetchOrderDetailsServiceApi}/${orderId}`,
        {
          withCredentials: true,
        }
      );

      console.log("fetchOrderDetailsResponse : ", fetchOrderDetailsResponse);
      return fetchOrderDetailsResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchOrderDetailsService;
