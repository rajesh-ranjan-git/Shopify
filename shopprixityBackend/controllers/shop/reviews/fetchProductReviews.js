import prisma from "../../../db/db.config.js";

// Fetch Product Reviews
const fetchProductReviews = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchProductReviews;
