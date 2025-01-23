import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopProductsApi } from "../../apiUrls";

const fetchShopProductsService = createAsyncThunk(
  "/products/fetchAllShopProducts",
  async ({ filterParams, sortParams }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const fetchShopProductsResponse = await axios.get(
        `${fetchShopProductsApi}?${query}`
      );

      return fetchShopProductsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchShopProductsService;
