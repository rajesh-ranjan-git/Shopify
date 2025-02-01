import vine, { errors } from "@vinejs/vine";
import prisma from "../../../db/db.config.js";
import productSchema from "../../../validations/admin/productValidations.js";

// Add a product
const addProduct = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(productSchema);
    const payload = await validator.validate(body);

    const product = await prisma.products.create({
      data: payload,
    });

    // Check if product is added
    if (product) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Product added successfully!",
        product: product,
      });
    }

    // Check if product is not added
    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while adding product!",
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
      // Check for all other errors
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong!",
      });
    }
  }
};

export default addProduct;
