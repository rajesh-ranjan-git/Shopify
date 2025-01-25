import prisma from "../../../db/db.config.js";

// Add items to cart
const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validating input
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "UserId is required!",
      });
    }

    if (!productId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ProductId is required!",
      });
    }

    if (!quantity && quantity <= 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid quantity provided!",
      });
    }

    // Check if item already exists
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (!existingCartItem) {
      // If item is not present in cart
      return res.status(400).json({
        status: 400,
        success: true,
        message: "Item is not present in cart!",
      });
    }

    // If item present in cart then update the quantity
    await prisma.cart.update({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      data: {
        quantity: quantity,
      },
    });

    // Fetch the updated cart to return
    const cart = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Cart Items updated!",
      cart: cart,
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

export default updateCartItems;
