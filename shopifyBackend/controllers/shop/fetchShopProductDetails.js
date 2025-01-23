import prisma from "../../db/db.config.js";

// Fetch Product Details
const fetchShopProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id : ", id);

    const product = await prisma.products.findFirst({
      where: { id: id },
    });

    console.log("product : ", product);

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
    console.log("error : ", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchShopProductDetails;
