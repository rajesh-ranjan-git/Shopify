import prisma from "../../../db/db.config.js";

// Add Product Reviews
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    console.log("productId : ", productId);
    console.log("userId : ", userId);
    console.log("userName : ", userName);
    console.log("reviewMessage : ", reviewMessage);
    console.log("reviewValue : ", reviewValue);

    // Find orders by user
    const ordersByUser = await prisma.orders.findMany({
      where: {
        AND: {
          userId: userId,
          NOT: { orderStatus: "rejected" || "pending" },
        },
      },
    });

    console.log("ordersByUser : ", ordersByUser);

    // Check if user has any existing successful order
    if (!ordersByUser && ordersByUser.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Please purchase this product to submit review!",
      });
    }

    // Find order with product if user has successful orders
    let ordersByUserWithProduct = null;
    for (const order of ordersByUser) {
      console.log("order : ", order);
      ordersByUserWithProduct = await prisma.orderItems.findFirst({
        where: {
          AND: {
            orderId: order.id,
            productId: productId,
          },
        },
      });

      console.log("ordersByUserWithProduct : ", ordersByUserWithProduct);

      // Check if user has ordered this product
      if (ordersByUserWithProduct) {
        break;
      }

      // Check if user has not ordered this product
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Please purchase this product to submit review!",
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

    console.log("existingReview : ", existingReview);

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

    console.log("newReview : ", newReview);

    // Check if review added successfully or not
    if (!newReview) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to add review!",
      });
    }

    // Find all the reviews for this product
    const totalReviews = await prisma.productReviews.findMany({
      where: {
        productId: productId,
      },
    });

    // Check if there are any reviews for this product
    if (!totalReviews) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to get total reviews!",
      });
    }

    // Find average review for this product
    const avgReview =
      totalReviews.reduce(
        (sum, reviewItem) => sum + reviewItem.reviewValue,
        0
      ) / totalReviews.length;

    // Update the rating for the product after adding the review
    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        rating: avgReview,
      },
    });

    // Check if product rating updated
    if (!product) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Unable to update product review!",
      });
    }

    // Check if the review got added successfully
    return res.status(201).json({
      status: 201,
      success: true,
      message: "Review added successfully!",
      productReview: newReview,
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
