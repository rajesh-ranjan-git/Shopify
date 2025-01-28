import prisma from "../../../db/db.config.js";

// Edit a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.products.delete({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        errors: {
          status: 404,
          success: false,
          message: "Product doesn't exist!",
        },
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted successfully!",
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

export default deleteProduct;
