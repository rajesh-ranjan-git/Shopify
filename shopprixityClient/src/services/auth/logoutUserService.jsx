import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserApi } from "../apiUrls";

const logoutUserService = createAsyncThunk("/auth/logout", async () => {
  try {
    const logoutUserResponse = await axios.post(
      logoutUserApi,
      {},
      {
        withCredentials: true,
      }
    );

    return logoutUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default logoutUserService;
