import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToShopCartApi } from "../../apiUrls";

const addToShopCartService = createAsyncThunk(
  "/products/addToCartItems",
  async ({ userId, productId, quantity }) => {
    try {
      const addToShopCartResponse = await axios.post(
        addToShopCartApi,
        { userId, productId, quantity },
        {
          withCredentials: true,
        }
      );

      return addToShopCartResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addToShopCartService;
