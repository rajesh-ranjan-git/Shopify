import prisma from "../../../db/db.config.js";

// Fetch order details for admin
const fetchOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find order with orderId
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
        shippingAddress: true,
      },
    });

    // Check if order is not found with orderId
    if (!order) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Order not found!",
      });
    }

    // Check if order is not found with orderId
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Order details fetched successfully!",
      order: order,
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

export default fetchOrderDetails;
