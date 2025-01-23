import prisma from "../../../db/db.config.js";

// Add items to Cart
const addOrUpdateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("userId : ", userId);
    console.log("productId : ", productId);
    console.log("quantity : ", quantity);

    // Validate request
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid request!",
      });
    }

    // Check if product is available
    const product = await prisma.products.findFirst({
      where: {
        id: productId,
      },
    });

    console.log("product : ", product);

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found!",
      });
    }

    const cart = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      create: {
        userId: userId,
        productId: productId,
        quantity: quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });

    console.log("cart : ", cart);

    if (cart) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Cart updated!",
      });
    }

    return res.status(400).json({
      status: 400,
      success: false,
      message: "Something went wrong while updating cart!",
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

export default addOrUpdateCart;
