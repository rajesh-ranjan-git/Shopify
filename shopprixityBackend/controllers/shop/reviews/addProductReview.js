import prisma from "../../../db/db.config.js";

// Add Product Reviews
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    // Find orders by user
    const ordersByUser = await prisma.orders.findMany({
      where: {
        AND: {
          userId: userId,
          NOT: { orderStatus: "rejected" || "pending" },
        },
      },
    });

    // Check if user has any existing successful order
    if (!ordersByUser && ordersByUser.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Please order this product to submit review!",
      });
    }

    // Find order with product if user has successful orders
    let ordersByUserWithProduct = null;
    for (const order of ordersByUser) {
      ordersByUserWithProduct = await prisma.orderItems.findFirst({
        where: {
          AND: {
            orderId: order.orderId,
            productId: productId,
          },
        },
      });

      // Check if user has ordered this product
      if (ordersByUserWithProduct) {
        break;
      }

      // Check if user has not ordered this product
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Please order this product to submit review!",
      });
    }

    // Find existing review for this product by user
    const existingReview = await prisma.productReviews.findFirst({
      where: {
        AND: {
          userId: userId,
          productId: productId,
        },
      },
    });

    // Check if user has already reviewed this product
    if (existingReview) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    // Add new review
    const newReview = await prisma.productReviews.create({
      data: {
        productId: productId,
        userId: userId,
        userName: userName,
        reviewMessage: reviewMessage,
        reviewValue: reviewValue,
      },
    });

    // Check if review added successfully or not
    if (!newReview) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to add review!",
      });
    }

    const totalReviews = await prisma.productReviews.findMany({
      where: {
        productId: productId,
      },
    });

    if (!totalReviews) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to get total reviews!",
      });
    }

    const avgReview =
      totalReviews.reduce((sum, curr) => (sum += curr.reviewValue), 0) /
      totalReviews.length;

    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        rating: avgReview,
      },
    });

    if (!product) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to update product review!",
      });
    }

    return res.status(201).json({
      status: 201,
      success: false,
      message: "Review added successfully!",
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

export default addProductReview;
