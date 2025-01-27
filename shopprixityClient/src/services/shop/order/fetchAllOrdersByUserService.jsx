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

      console.log(
        "fetchAllOrdersByUserResponse : ",
        fetchAllOrdersByUserResponse
      );
      return fetchAllOrdersByUserResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchAllOrdersByUserService;
