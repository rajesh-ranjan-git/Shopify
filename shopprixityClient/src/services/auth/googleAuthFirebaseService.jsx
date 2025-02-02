import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { googleAuthFirebaseServiceApi } from "../apiUrls";

const googleAuthFirebaseService = createAsyncThunk(
  "/auth/googleAuthFirebase",
  async (formData) => {
    try {
      const googleAuthFirebaseServiceResponse = await axios.post(
        googleAuthFirebaseServiceApi,
        formData,
        {
          withCredentials: true,
        }
      );

      return googleAuthFirebaseServiceResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default googleAuthFirebaseService;
