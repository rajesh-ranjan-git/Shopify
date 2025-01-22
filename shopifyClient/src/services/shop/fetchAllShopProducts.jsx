import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllShopProductsApi } from "../apiUrls";

const fetchAllShopProductsService = createAsyncThunk(
  "/products/fetchAllShopProducts",
  async () => {
    try {
      const fetchAllShopProductsResponse = await axios.get(
        fetchAllShopProductsApi
      );

      return fetchAllShopProductsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllShopProductsService;
