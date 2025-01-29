import prisma from "../../../db/db.config.js";

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({});

    // Check if products were found
    if (products) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Products fetched successfully!",
        products: products,
      });
    }

    // Check if products were not found
    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while fetching products!",
      },
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

export default fetchAllProducts;
