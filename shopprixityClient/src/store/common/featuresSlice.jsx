import { createSlice } from "@reduxjs/toolkit";
import fetchSliderImagesService from "@/services/common/fetchSliderImagesService";
import addSliderImageService from "@/services/common/addSliderImageService";

const initialState = {
  isLoading: true,
  sliderImages: [],
};

const featuresSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderImagesService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSliderImagesService.fulfilled, (state, action) => {
        state.sliderImages = action?.payload?.sliderImages;
        state.isLoading = false;
      })
      .addCase(fetchSliderImagesService.rejected, (state) => {
        state.sliderImages = [];
        state.isLoading = false;
      })
      .addCase(addSliderImageService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSliderImageService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addSliderImageService.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default featuresSlice.reducer;
