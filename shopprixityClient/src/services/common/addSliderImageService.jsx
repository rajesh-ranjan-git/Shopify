import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSliderImageServiceApi } from "../apiUrls";

const addSliderImageService = createAsyncThunk(
  "/addSliderImage",
  async ({ sliderImage }) => {
    try {
      const addSliderImageServiceResponse = await axios.post(
        addSliderImageServiceApi,
        { sliderImage }
      );

      return addSliderImageServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addSliderImageService;
