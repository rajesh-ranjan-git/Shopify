import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopProductDetailsApi } from "../../apiUrls";

const fetchShopProductDetailsService = createAsyncThunk(
  "/products/fetchShopProductDetails",
  async (id) => {
    try {
      const fetchShopProductDetailsServiceResponse = await axios.get(
        `${fetchShopProductDetailsApi}/${id}`
      );

      return fetchShopProductDetailsServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchShopProductDetailsService;
