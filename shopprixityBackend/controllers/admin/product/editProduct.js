import vine, { errors } from "@vinejs/vine";
import prisma from "../../../db/db.config.js";
import productSchema from "../../../validations/admin/productValidations.js";

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Validate request body
    const validator = vine.compile(productSchema);
    const payload = await validator.validate(body);

    // Find product to edit
    const findProduct = await prisma.products.findMany({
      where: { id: id },
    });

    // Check if product is not present
    if (!findProduct) {
      return res.status(404).json({
        errors: {
          status: 404,
          success: false,
          message: "Product doesn't exist!",
        },
      });
    }

    // Update values locally if the product is present
    findProduct.title = payload.title || findProduct.title;
    findProduct.description = payload.description || findProduct.description;
    findProduct.category = payload.category || findProduct.category;
    findProduct.brand = payload.brand || findProduct.brand;
    findProduct.price =
      payload.price !== 0 ? payload.price || findProduct.price : 0;
    findProduct.salePrice =
      payload.salePrice !== 0 ? payload.salePrice || findProduct.salePrice : 0;
    findProduct.totalStock =
      payload.totalStock !== 0
        ? payload.totalStock || findProduct.totalStock
        : 0;
    findProduct.image = payload.image || findProduct.image;

    // Push the updated product changes to db
    const product = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        title: findProduct.title,
        description: findProduct.description,
        category: findProduct.category,
        brand: findProduct.brand,
        price: findProduct.price,
        salePrice: findProduct.salePrice,
        totalStock: findProduct.totalStock,
        image: findProduct.image,
      },
    });

    // Check if product is updated
    if (product) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Product edited successfully!",
        product: product,
      });
    }
    // Check if product is not updated
    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while editing product!",
      },
    });
  } catch (error) {
    // Check for validation error
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Validation Error",
        errors: error.messages,
      });
    } else {
      // Check for other errors
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong!",
      });
    }
  }
};

export default editProduct;
