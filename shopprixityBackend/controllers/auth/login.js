import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/db.config.js";
import { loginSchema } from "../../validations/auth/authValidations.js";

// Login user

const login = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);

    // Find user
    const user = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    // Check if user not found
    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist!",
      });
    } else {
      // Decrypt password if user found

      // Check if password is invalid
      if (!bcrypt.compareSync(payload.password, user.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid credentials!",
        });
      }

      // Create payload if password is valid
      const payloadData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // Issue token to login
      const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      return res
        .cookie("token", token, { httpOnly: true, secure: false })
        .status(200)
        .json({
          status: 200,
          success: true,
          message: "Logged in successfully!",
          user: user,
        });
    }
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

export default login;
