import prisma from "../../../db/db.config.js";

// Add items to cart
const capturePayment = async (req, res) => {
  try {
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
