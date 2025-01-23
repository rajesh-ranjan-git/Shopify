import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateShopCartApi } from "../../apiUrls";

const updateShopCartService = createAsyncThunk(
  "/products/updateCartItems",
  async ({ userId, productId, quantity }) => {
    try {
      const updateShopCartResponse = await axios.put(
        updateShopCartApi,
        { userId, productId, quantity },
        {
          withCredentials: true,
        }
      );

      return updateShopCartResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateShopCartService;
