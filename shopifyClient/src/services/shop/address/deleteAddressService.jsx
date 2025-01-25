import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAddressApi } from "../../apiUrls";

const deleteAddressService = createAsyncThunk(
  "/products/deleteAddress",
  async ({ userId, addressId }) => {
    try {
      const deleteAddressServiceResponse = await axios.delete(
        `${deleteAddressApi}/${userId}/${addressId}`
      );

      return deleteAddressServiceResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default deleteAddressService;
