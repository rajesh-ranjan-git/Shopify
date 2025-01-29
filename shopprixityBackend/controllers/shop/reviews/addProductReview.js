import prisma from "../../../db/db.config.js";

// Add Product Reviews
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    // Find for orders by user
    const ordersByUser = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
      select: id,
    });

    // Find orders with product
    const orderItemsByUserWithProduct = await prisma.orderItems.findMany({
      where: {
        productId: productId,
      },
      select: orderId,
    });

    // Check if user has ordered the product
    const orderWithProduct = ordersByUser.reduce(
      (prev, curr) => (prev = orderItemsByUserWithProduct.includes(curr)),
      false
    );

    // Check if user has not ordered the product
    if (!orderWithProduct) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Item not purchased before!",
      });
    }

    // Find review bu user for product
    const checkExistingReview = await prisma.productReviews.findFirst({
      where: {
        productId: productId,
      },
    });

    // Check if user has reviewed order
    if (checkExistingReview) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    // Add new review by user for the product
    const newReview = await prisma.productReviews.create({
      data: {
        productId: productId,
        userId: userId,
        userName: userName,
        reviewMessage: reviewMessage,
        reviewValue: reviewValue,
      },
    });

    // Find review by user for the product
    const reviews = await prisma.productReviews.find({
      where: {
        productId: productId,
      },
    });

    // Find average review for product
    const avgReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length;

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Review added successfully!",
      reviews: reviews,
      avgReview: avgReview,
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

export default addProductReview;
