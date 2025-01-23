import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteShopCartApi } from "../../apiUrls";

const deleteShopCartService = createAsyncThunk(
  "/products/deleteCartItems",
  async ({ userId, productId }) => {
    console.log("userId : ", userId);
    console.log("productId : ", productId);

    try {
      const deleteShopCartResponse = await axios.get(
        `${deleteShopCartApi}/${userId}`,
        { userId, productId },
        {
          withCredentials: true,
        }
      );

      console.log("deleteShopCartResponse : ", deleteShopCartResponse);
      console.log(
        "deleteShopCartResponse.data : ",
        deleteShopCartResponse.data
      );

      return deleteShopCartResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default deleteShopCartService;
