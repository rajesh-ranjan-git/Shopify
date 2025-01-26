import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addAddressApi } from "../../apiUrls";

const addAddressService = createAsyncThunk(
  "/products/addAddress",
  async (formData) => {
    try {
      const addAddressServiceResponse = await axios.post(
        addAddressApi,
        formData,
        {
          withCredentials: true,
        }
      );

      return addAddressServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addAddressService;
