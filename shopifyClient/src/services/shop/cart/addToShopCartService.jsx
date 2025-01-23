import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToShopCartApi } from "../../apiUrls";

const addToShopCartService = createAsyncThunk(
  "/products/addToCartItems",
  async ({ userId, productId, quantity }) => {
    console.log("userId : ", userId);
    console.log("productId : ", productId);
    console.log("quantity : ", quantity);

    try {
      const addToShopCartResponse = await axios.get(
        `${addToShopCartApi}/${userId}`,
        { userId, productId, quantity },
        {
          withCredentials: true,
        }
      );

      console.log("addToShopCartResponse : ", addToShopCartResponse);
      console.log("addToShopCartResponse.data : ", addToShopCartResponse.data);

      return addToShopCartResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default addToShopCartService;
