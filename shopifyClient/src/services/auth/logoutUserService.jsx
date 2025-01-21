import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserApi } from "../apiUrls";

const logoutUserService = createAsyncThunk("/auth/logout", async () => {
  try {
    const logoutUserResponse = await axios.post(
      logoutUserApi,
      {},
      {
        withCredential: true,
      }
    );

    return logoutUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default logoutUserService;
