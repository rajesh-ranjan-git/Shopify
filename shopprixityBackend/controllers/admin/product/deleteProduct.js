import prisma from "../../../db/db.config.js";

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product to delete
    const product = await prisma.products.delete({
      where: {
        id: id,
      },
    });

    // Check if product is not present
    if (!product) {
      return res.status(404).json({
        errors: {
          status: 404,
          success: false,
          message: "Product doesn't exist!",
        },
      });
    }

    // Check if product is present and got deleted
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted successfully!",
      product: product,
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

export default deleteProduct;
