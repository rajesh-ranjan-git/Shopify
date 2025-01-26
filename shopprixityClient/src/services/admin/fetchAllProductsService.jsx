import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi } from "../apiUrls";

const fetchAllProductsService = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    try {
      const fetchAllProductsResponse = await axios.get(fetchAllProductsApi);

      return fetchAllProductsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllProductsService;
