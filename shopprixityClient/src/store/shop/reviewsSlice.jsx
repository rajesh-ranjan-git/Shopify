import { createSlice } from "@reduxjs/toolkit";
import fetchProductReviewsService from "@/services/shop/reviews/fetchProductReviewsService";

const initialState = {
  isLoading: false,
  reviews: [],
  productReview: null,
};

const ReviewsSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviewsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductReviewsService.fulfilled, (state, action) => {
        console.log("action?.payload : ", action?.payload);
        state.reviews = action?.payload?.reviews;
        state.isLoading = false;
      })
      .addCase(fetchProductReviewsService.rejected, (state) => {
        state.reviews = [];
        state.isLoading = false;
      })
      .addCase(fetchProductReviewsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductReviewsService.fulfilled, (state, action) => {
        console.log("action?.payload : ", action?.payload);
        state.productReview = action?.payload?.productReview;
        state.isLoading = false;
      })
      .addCase(fetchProductReviewsService.rejected, (state) => {
        state.productReview = null;
        state.isLoading = false;
      });
  },
});

export default ReviewsSlice.reducer;
