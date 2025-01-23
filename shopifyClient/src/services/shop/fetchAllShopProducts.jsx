import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllShopProductsApi } from "../apiUrls";

const fetchAllShopProductsService = createAsyncThunk(
  "/products/fetchAllShopProducts",
  async (filterParams, sortParams) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
      const fetchAllShopProductsResponse = await axios.get(
        `${fetchAllShopProductsApi}?${query}`
      );

      console.log(
        "fetchAllShopProductsResponse : ",
        fetchAllShopProductsResponse
      );
      return fetchAllShopProductsResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchAllShopProductsService;
