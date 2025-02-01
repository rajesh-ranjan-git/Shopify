import prisma from "../../../db/db.config.js";

// Fetch Product Reviews
const fetchProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find all the reviews for this product
    const reviews = await prisma.productReviews.findMany({
      where: {
        productId: productId,
      },
    });

    // Check if no review exists for this product
    if (!reviews) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Could not fetch reviews for this product!",
      });
    }

    // Check if the review exists
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product reviews fetched successfully!",
      reviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchProductReviews;
