import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdminOrderDetailsServiceApi } from "../../apiUrls";

const fetchAdminOrderDetailsService = createAsyncThunk(
  "/order/orderDetails",
  async (orderId) => {
    try {
      const fetchAdminOrderDetailsResponse = await axios.get(
        `${fetchAdminOrderDetailsServiceApi}/${orderId}`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "fetchAdminOrderDetailsResponse : ",
        fetchAdminOrderDetailsResponse
      );
      return fetchAdminOrderDetailsResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchAdminOrderDetailsService;
