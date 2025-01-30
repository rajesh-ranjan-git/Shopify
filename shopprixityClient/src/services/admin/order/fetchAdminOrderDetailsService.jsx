import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdminOrderDetailsServiceApi } from "../../apiUrls";

const fetchAdminOrderDetailsService = createAsyncThunk(
  "/order/fetchOrderDetails",
  async (orderId) => {
    try {
      const fetchAdminOrderDetailsResponse = await axios.get(
        `${fetchAdminOrderDetailsServiceApi}/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return fetchAdminOrderDetailsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAdminOrderDetailsService;
