import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductReviewsServiceApi } from "../../apiUrls";

const fetchProductReviewsService = createAsyncThunk(
  "/products/fetchProductReviews",
  async ({ productId }) => {
    try {
      const fetchProductReviewsResponse = await axios.get(
        `${fetchProductReviewsServiceApi}?${productId}`
      );

      return fetchProductReviewsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchProductReviewsService;
