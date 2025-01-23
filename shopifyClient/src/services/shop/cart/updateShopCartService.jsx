import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateShopCartApi } from "../../apiUrls";

const updateShopCartService = createAsyncThunk(
  "/products/updateCartItems",
  async ({ userId, productId, quantity }) => {
    console.log("userId : ", userId);
    console.log("productId : ", productId);
    console.log("quantity : ", quantity);

    try {
      const updateShopCartResponse = await axios.get(
        `${updateShopCartApi}/${userId}`,
        { userId, productId, quantity },
        {
          withCredentials: true,
        }
      );

      console.log("updateShopCartResponse : ", updateShopCartResponse);
      console.log(
        "updateShopCartResponse.data : ",
        updateShopCartResponse.data
      );

      return updateShopCartResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default updateShopCartService;
