import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi } from "../apiUrls";

const loginUserService = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const loginUserResponse = await axios.post(loginUserApi, formData, {
      withCredentials: true,
    });
    return loginUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
});

export default loginUserService;
