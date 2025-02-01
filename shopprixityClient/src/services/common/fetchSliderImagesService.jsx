import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSliderImagesServiceApi } from "../apiUrls";

const fetchSliderImagesService = createAsyncThunk(
  "/fetchSliderImages",
  async () => {
    try {
      const fetchSliderImagesServiceResponse = await axios.get(
        fetchSliderImagesServiceApi
      );

      return fetchSliderImagesServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchSliderImagesService;
