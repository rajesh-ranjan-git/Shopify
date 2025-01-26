import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopCartApi } from "../../apiUrls";

const fetchShopCartService = createAsyncThunk(
  "/products/fetchCartItems",
  async (userId) => {
    try {
      const fetchShopCartResponse = await axios.get(
        `${fetchShopCartApi}/${userId}`
      );

      return fetchShopCartResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchShopCartService;
