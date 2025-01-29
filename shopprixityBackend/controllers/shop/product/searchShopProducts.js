import prisma from "../../../db/db.config.js";

// Search Shop products
const searchShopProducts = async (req, res) => {
  try {
    const { searchKeyword } = req.params;

    console.log("searchKeyword : ", searchKeyword);

    if (!searchKeyword || typeof searchKeyword !== "string") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Search keyword is required and must be in string format!",
      });
    }

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

    console.log("searchResults : ", searchResults);

    if (searchResults) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Search successful!",
        products: searchResults,
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not find searched products!",
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

export default searchShopProducts;
