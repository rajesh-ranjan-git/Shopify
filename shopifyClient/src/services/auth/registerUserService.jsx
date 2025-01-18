import axios from "axios";
import { registerUserApi } from "../apiUrls";

export const registerUserService = async (formData) => {
  console.log("formData from registerUser : ", formData);

  try {
    const registerUserResponse = await axios.post(registerUserApi, formData, {
      withCredentials: true,
    });

    console.log("registerUserResponse: ", registerUserResponse);
    return registerUserResponse.data;
  } catch (error) {
    console.log("error in registerUser :", error.response.data);
  }
};
