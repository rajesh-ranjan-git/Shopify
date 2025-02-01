import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductReviewsServiceApi } from "../../apiUrls";

const addProductReviewsService = createAsyncThunk(
  "/products/addProductReviews",
  async ({ reviewData }) => {
    try {
      const fetchProductReviewsResponse = await axios.get(
        { fetchProductReviewsServiceApi },
        reviewData,
        {
          withCredentials: true,
        }
      );

      return fetchProductReviewsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addProductReviewsService;
