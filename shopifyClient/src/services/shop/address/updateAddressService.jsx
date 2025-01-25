import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateAddressApi } from "../../apiUrls";

const updateAddressService = createAsyncThunk(
  "/products/updateCartItems",
  async ({ userId, addressId, formData }) => {
    try {
      const updateAddressServiceResponse = await axios.put(
        `${updateAddressApi}/${userId}/${addressId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      return updateAddressServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateAddressService;
