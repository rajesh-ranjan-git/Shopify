import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductReviewServiceApi } from "../../apiUrls";

const addProductReviewService = createAsyncThunk(
  "/products/addProductReviews",
  async ({ productId, userId, userName, reviewMessage, reviewValue }) => {
    try {
      console.log("productId : ", productId);
      console.log("userId : ", userId);
      console.log("userName : ", userName);
      console.log("reviewMessage : ", reviewMessage);
      console.log("reviewValue : ", reviewValue);
      const addProductReviewResponse = await axios.post(
        addProductReviewServiceApi,
        { productId, userId, userName, reviewMessage, reviewValue },
        {
          withCredentials: true,
        }
      );

      console.log("addProductReviewResponse : ", addProductReviewResponse);
      console.log(
        "addProductReviewResponse.data : ",
        addProductReviewResponse?.data
      );
      return addProductReviewResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default addProductReviewService;
