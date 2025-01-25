import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addAddressApi } from "../../apiUrls";

const addAddressService = createAsyncThunk(
  "/products/addAddress",
  async ({ userId, formData }) => {
    // const { address, city, pincode, phone, notes } = formData;
    try {
      const addAddressServiceResponse = await axios.post(
        addAddressApi,
        // { userId, address, city, pincode, phone, notes },
        { formData },
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
