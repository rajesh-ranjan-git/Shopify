import prisma from "../../../db/db.config.js";

// Fetch order details
const fetchOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order with orderId
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
        shippingAddress: true,
      },
    });

    // Check if order not found
    if (!order) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Order not found!",
      });
    }

    // Check if order found
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Order details fetched successfully!",
      order: order,
    });
  } catch (error) {
    // Check for errors
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchOrderDetails;
