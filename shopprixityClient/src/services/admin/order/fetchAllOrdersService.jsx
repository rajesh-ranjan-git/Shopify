import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllOrdersServiceApi } from "../../apiUrls";

const fetchAllOrdersService = createAsyncThunk("/order/allOrders", async () => {
  try {
    const fetchAllOrdersResponse = await axios.get(fetchAllOrdersServiceApi, {
      withCredentials: true,
    });

    return fetchAllOrdersResponse?.data;
  } catch (error) {
    return error.response.data;
  }
});

export default fetchAllOrdersService;
