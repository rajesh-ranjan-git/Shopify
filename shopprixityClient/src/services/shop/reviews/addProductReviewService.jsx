import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductReviewServiceApi } from "../../apiUrls";

const addProductReviewService = createAsyncThunk(
  "/products/addProductReviews",
  async ({ productId, userId, userName, reviewMessage, reviewValue }) => {
    try {
      const addProductReviewResponse = await axios.post(
        addProductReviewServiceApi,
        { productId, userId, userName, reviewMessage, reviewValue },
        {
          withCredentials: true,
        }
      );

      return addProductReviewResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addProductReviewService;
