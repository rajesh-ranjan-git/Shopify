import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateAddressApi } from "../../apiUrls";

const updateAddressService = createAsyncThunk(
  "/products/updateCartItems",
  async ({ userId, addressId, formdata }) => {
    try {
      const updateAddressServiceResponse = await axios.put(
        `${updateAddressApi}/${userId}/${addressId}`,
        { formdata },
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
