import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi } from "../apiUrls";

const registerUserService = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const registerUserResponse = await axios.post(registerUserApi, formData, {
        withCredentials: true,
      });
      return registerUserResponse.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default registerUserService;
