import prisma from "../../../db/db.config.js";

// Fetch Shop products
const fetchShopProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    // Handle Filters
    let filters = {};

    if (category.length) {
      filters.category = { in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { in: brand.split(",") };
    }

    // Handle Sorting
    let orderBy = {};

    switch (sortBy) {
      case "price-lowtohigh":
        orderBy = { price: "asc" };
        break;
      case "price-hightolow":
        orderBy = { price: "desc" };
        break;
      case "title-atoz":
        orderBy = { title: "asc" };
        break;
      case "title-ztoa":
        orderBy = { title: "desc" };
        break;
      default:
        orderBy = { price: "asc" };
        break;
    }

    // Find filtered products
    const products = await prisma.products.findMany({
      where: filters,
      orderBy,
    });

    // Check if filtered products found
    if (products) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Products fetched successfully!",
        products: products,
      });
    }

    // Check if filtered products not found
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

export default fetchShopProducts;
