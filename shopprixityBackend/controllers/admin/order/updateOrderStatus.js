import prisma from "../../../db/db.config.js";

// AUpdate order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Order not found!",
      });
    }

    const updatedOrder = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus,
      },
    });

    if (updatedOrder) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Order status updated successfully!",
        order: updatedOrder,
      });
    }

    return res.status(400).json({
      status: 400,
      success: true,
      message: "Could not update order status!",
    });
  } catch (error) {
    // Check for errors
    console.log("error : ", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default updateOrderStatus;
