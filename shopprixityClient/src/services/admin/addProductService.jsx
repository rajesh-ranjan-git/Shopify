import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi } from "../apiUrls";

const addProductService = createAsyncThunk(
  "/products/addProduct",
  async (formData) => {
    try {
      const addProductResponse = await axios.post(addProductApi, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return addProductResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default addProductService;
