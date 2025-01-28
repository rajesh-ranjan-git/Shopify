import prisma from "../../../db/db.config.js";

// Add Product Reviews
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const ordersByUser = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
      select: id,
    });

    const orderItemsByUserWithProduct = await prisma.orderItems.findMany({
      where: {
        productId: productId,
      },
      select: orderId,
    });

    const orderWithProduct = ordersByUser.reduce(
      (prev, curr) => (prev = orderItemsByUserWithProduct.includes(curr)),
      false
    );

    if (!orderWithProduct) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Item not purchased before!",
      });
    }

    const checkExistingReview = await prisma.productReviews.findFirst({
      where: {
        productId: productId,
      },
    });

    if (checkExistingReview) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    const newReview = await prisma.productReviews.create({
      data: {
        productId: productId,
        userId: userId,
        userName: userName,
        reviewMessage: reviewMessage,
        reviewValue: reviewValue,
      },
    });

    const reviews = await prisma.productReviews.find({
      where: {
        productId: productId,
      },
    });

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
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default addProductReview;
