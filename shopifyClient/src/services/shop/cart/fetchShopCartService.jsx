import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopCartApi } from "../../apiUrls";

const fetchShopCartService = createAsyncThunk(
  "/products/fetchCartItems",
  async (userId) => {
    try {
      console.log("userId : ", userId);

      const fetchShopCartResponse = await axios.get(
        `${fetchShopCartApi}/${userId}`
      );

      console.log("fetchShopCartResponse : ", fetchShopCartResponse);
      console.log("fetchShopCartResponse.data : ", fetchShopCartResponse.data);

      return fetchShopCartResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchShopCartService;
