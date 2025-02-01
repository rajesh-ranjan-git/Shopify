import prisma from "../../../db/db.config.js";

// Fetch Product Reviews
const fetchProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await prisma.productReviews.findMany({
      where: {
        productId: productId,
      },
    });

    if (!reviews) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Could not fetch reviews for this product!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product reviews fetched successfully!",
      reviews: reviews,
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

export default fetchProductReviews;
