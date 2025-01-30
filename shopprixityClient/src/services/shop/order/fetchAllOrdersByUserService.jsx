import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllOrdersByUserServiceApi } from "../../apiUrls";

const fetchAllOrdersByUserService = createAsyncThunk(
  "/order/allOrdersByUser",
  async (userId) => {
    try {
      const fetchAllOrdersByUserResponse = await axios.get(
        `${fetchAllOrdersByUserServiceApi}/${userId}`,
        {
          withCredentials: true,
        }
      );

      return fetchAllOrdersByUserResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllOrdersByUserService;
