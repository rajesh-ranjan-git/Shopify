import prisma from "../../../db/db.config.js";

// Delete Cart Items
const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

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

    // Find item to delete from cart
    const itemToDelete = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    // Check if item is not present in cart
    if (!itemToDelete) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Item not present in cart!",
      });
    }

    // Delete item if present in cart
    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    // Fetch updated cart
    const cart = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    // Check if cart found after delete
    if (cart) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Item deleted from cart!",
        cart: cart,
      });
    }

    // Check if delete items is not successful
    return res.status(400).json({
      status: 400,
      success: true,
      message: "Could not delete item from cart!",
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

export default deleteCartItems;
