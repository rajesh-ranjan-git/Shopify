import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthApi } from "../apiUrls";

const checkAuthService = createAsyncThunk("/auth/checkAuth", async () => {
  try {
    const checkAuthResponse = await axios.get(checkAuthApi, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });

    return checkAuthResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default checkAuthService;
