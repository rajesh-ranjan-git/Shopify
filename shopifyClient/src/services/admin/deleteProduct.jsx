import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProductApi } from "../apiUrls";

const deleteProductService = createAsyncThunk(
  ".products/addProduct",
  async (id) => {
    try {
      const deleteProductResponse = await axios.delete(
        `${deleteProductApi}/${id}`
      );

      return deleteProductResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default deleteProductService;
