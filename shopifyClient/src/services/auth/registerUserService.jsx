import axios from "axios";
import { registerUserApi } from "../apiUrls";

export const registerUserService = async (formData) => {
  try {
    const registerUserResponse = await axios.post(registerUserApi, formData, {
      withCredentials: true,
    });
    return registerUserResponse.data;
  } catch (error) {
    return error.response.data;
  }
};
