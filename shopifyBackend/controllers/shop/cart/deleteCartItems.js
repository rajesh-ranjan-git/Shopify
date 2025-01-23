import prisma from "../../../db/db.config.js";

// Fetch Shop products
const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("userId : ", userId);
    console.log("productId : ", productId);

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

    // Check if item does not exist
    const itemToDelete = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    console.log("itemToDelete : ", itemToDelete);

    if (!itemToDelete) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Item not present in cart!",
      });
    }

    const cart = await prisma.cart.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    console.log("cart : ", cart);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Item deleted from cart!",
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default deleteCartItems;
