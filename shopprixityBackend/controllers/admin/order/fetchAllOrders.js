import prisma from "../../../db/db.config.js";

// Fetch all orders of all users
const fetchAllOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({});

    // Check if no orders
    if (!orders.length) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No orders found!",
      });
    }

    // Check if orders found
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Orders fetched successfully!",
      orders: orders,
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

export default fetchAllOrders;
