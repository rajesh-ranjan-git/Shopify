import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchShopProductsServiceApi } from "../../apiUrls";

const searchShopProductsService = createAsyncThunk(
  "/products/searchShopProducts",
  async (searchKeyword) => {
    try {
      const searchShopProductsResponse = await axios.get(
        `${searchShopProductsServiceApi}?${searchKeyword}`
      );

      console.log("searchShopProductsResponse : ", searchShopProductsResponse);

      return searchShopProductsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default searchShopProductsService;
