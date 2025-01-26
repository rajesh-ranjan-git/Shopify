import prisma from "../../../db/db.config.js";

// Fetch Cart Items
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validating input
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "UserId is required!",
      });
    }

    // Check if user has items in cart
    const cart = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    if (cart && cart.length > 0) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Cart fetched successfully!",
        cart: cart,
      });
    }

    // Check if not items in cart
    return res.status(404).json({
      status: 404,
      success: false,
      message: "No items in cart!",
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

export default fetchCartItems;
