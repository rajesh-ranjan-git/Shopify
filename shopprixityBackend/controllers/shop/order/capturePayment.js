import prisma from "../../../db/db.config.js";

// Add items to cart
const capturePayment = async (req, res) => {
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

    if (!quantity || quantity <= 0) {
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

    let cart;

    if (!existingCartItem) {
      // If no cart items then create cart and add items
      cart = await prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity,
        },
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "Item added to cart!",
        cart: cart,
      });
    }

    // If item present in cart then increase the quantity
    cart = await prisma.cart.update({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Cart Items updated!",
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

export default capturePayment;
