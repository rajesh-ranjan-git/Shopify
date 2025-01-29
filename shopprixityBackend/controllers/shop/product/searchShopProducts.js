import prisma from "../../../db/db.config.js";

// Search Shop products
const searchShopProducts = async (req, res) => {
  try {
    const { searchKeyword } = req.params;

    // Validating search keyword
    if (!searchKeyword || typeof searchKeyword !== "string") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Search keyword is required and must be in string format!",
      });
    }

    // Find products with search keyword
    const searchResults = await prisma.products.findMany({
      where: {
        OR: [
          { title: { contains: searchKeyword, mode: "insensitive" } },
          { description: { contains: searchKeyword, mode: "insensitive" } },
          { category: { contains: searchKeyword, mode: "insensitive" } },
          { brand: { contains: searchKeyword, mode: "insensitive" } },
        ],
      },
    });

    // Check if products found with search keyword
    if (searchResults) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Search successful!",
        products: searchResults,
      });
    }

    // Check if products not found with search keyword
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not find searched products!",
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

export default searchShopProducts;
