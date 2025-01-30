import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrderStatusServiceApi } from "../../apiUrls";

const updateOrderStatusService = createAsyncThunk(
  "/order/updateOrderDetails",
  async ({ orderId, orderStatus }) => {
    try {
      const updateOrderStatusResponse = await axios.get(
        `${updateOrderStatusServiceApi}/${orderId}`,
        { orderStatus },
        {
          withCredentials: true,
        }
      );

      return updateOrderStatusResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default updateOrderStatusService;
