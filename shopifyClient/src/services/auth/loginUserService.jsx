import axios from "axios";
import { loginUserApi } from "../apiUrls";

export const loginUserService = async (formData) => {
  try {
    const loginUserResponse = await axios.post(loginUserApi, formData, {
      withCredentials: true,
    });
    return loginUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
};
