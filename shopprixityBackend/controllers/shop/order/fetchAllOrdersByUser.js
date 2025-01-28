import prisma from "../../../db/db.config.js";

// Add items to cart
const fetchAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    if (!orders.length) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No orders found!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Orders fetched successfully!",
      orders: orders,
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

export default fetchAllOrdersByUser;
