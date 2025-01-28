import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { editProductApi } from "../../apiUrls";

const editProductService = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    try {
      const editProductResponse = await axios.put(
        `${editProductApi}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return editProductResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default editProductService;
