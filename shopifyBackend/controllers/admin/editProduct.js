import { errors } from "@vinejs/vine";
import productSchema from "../../validations/admin/productValidations.js";

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Validate request body
    const validator = vine.compile(productSchema);
    const payload = await validator.validate(body);

    const findProduct = await prisma.products.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        errors: {
          status: 404,
          success: false,
          message: "Product doesn't exist!",
        },
      });
    }

    findProduct.title = payload.title || findProduct.title;
    findProduct.description = payload.description || findProduct.description;
    findProduct.category = payload.category || findProduct.category;
    findProduct.brand = payload.brand || findProduct.brand;
    findProduct.price = payload.price || findProduct.price;
    findProduct.salePrice = payload.salePrice || findProduct.salePrice;
    findProduct.totalStock = payload.totalStock || findProduct.totalStock;
    findProduct.image = payload.image || findProduct.image;

    const product = await prisma.products.update({
      where: {
        id: id,
      },
      data: findProduct,
    });

    if (product) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Product edited successfully!",
        product: product,
      });
    }

    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while editing product!",
      },
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Validation Error",
        errors: error.messages,
      });
    } else {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong!",
      });
    }
  }
};

export default editProduct;
