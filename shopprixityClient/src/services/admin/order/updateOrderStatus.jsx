import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrderStatusServiceApi } from "../../apiUrls";

const updateOrderStatusService = createAsyncThunk(
  "/order/orderDetails",
  async ({ orderId, orderStatus }) => {
    try {
      const updateOrderStatusResponse = await axios.get(
        `${updateOrderStatusServiceApi}/${orderId}`,
        { orderStatus },
        {
          withCredentials: true,
        }
      );

      console.log("updateOrderStatusResponse : ", updateOrderStatusResponse);
      return updateOrderStatusResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default updateOrderStatusService;
