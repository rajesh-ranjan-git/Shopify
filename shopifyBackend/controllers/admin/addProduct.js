import { errors } from "@vinejs/vine";
import productSchema from "../../validations/admin/productValidations.js";

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

    if (product) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Product created successfully!",
        product: product,
      });
    }

    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while adding product!",
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

export default addProduct;
