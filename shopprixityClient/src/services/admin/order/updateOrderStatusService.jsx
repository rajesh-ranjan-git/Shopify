import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrderStatusServiceApi } from "../../apiUrls";

const updateOrderStatusService = createAsyncThunk(
  "/order/updateOrderDetails",
  async ({ orderId, status }) => {
    const orderStatus = status.status;
    console.log("orderStatus : ", orderStatus);
    try {
      const updateOrderStatusResponse = await axios.put(
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
