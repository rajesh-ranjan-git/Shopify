import prisma from "../../db/db.config.js";

// Fetch Product Details
const fetchShopProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.products.findMany({
      where: { id: id },
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: true,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product fetched successfully!",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchShopProductDetails;
