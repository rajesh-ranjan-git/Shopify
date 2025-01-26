import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddressApi } from "../../apiUrls";

const fetchAddressService = createAsyncThunk(
  "/products/fetchAddress",
  async (userId) => {
    try {
      const fetchAddressResponse = await axios.get(
        `${fetchAddressApi}/${userId}`
      );

      return fetchAddressResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAddressService;
