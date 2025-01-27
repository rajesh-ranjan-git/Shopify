import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteShopCartApi } from "../../apiUrls";

const deleteShopCartService = createAsyncThunk(
  "/products/deleteCartItems",
  async ({ userId, productId }) => {
    try {
      const deleteShopCartResponse = await axios.delete(
        `${deleteShopCartApi}/${userId}/${productId}`
      );

      return deleteShopCartResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default deleteShopCartService;
