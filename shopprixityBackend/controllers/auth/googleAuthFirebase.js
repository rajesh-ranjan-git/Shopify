import vine, { errors } from "@vinejs/vine";
import jwt from "jsonwebtoken";
import prisma from "../../db/db.config.js";
import { googleAuthFirebaseSchema } from "../../validations/auth/authValidations.js";

// Login user

const googleAuthFirebase = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(googleAuthFirebaseSchema);
    const payload = await validator.validate(body);

    // Check if user already exists
    const findUser = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (findUser) {
      // Create payload if user exists
      const payloadData = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        profileImage: findUser.profileImage,
        role: findUser.role,
      };

      // Issue token to login
      const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      return res
        .cookie("token", token, { httpOnly: true, secure: true })
        .status(200)
        .json({
          status: 200,
          success: true,
          message: "Logged in successfully!",
          user: findUser,
        });
    }

    // Register user if user does not exist
    const user = await prisma.users.create({
      data: payload,
    });

    // Check if user is registered successfully
    if (user) {
      const payloadData = {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      };

      // Issue token to login
      const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      // Create cookie
      return res
        .cookie("token", token, { httpOnly: true, secure: true })
        .status(200)
        .json({
          status: 200,
          success: true,
          message: "User created successfully!",
          user: user,
        });
    }

    // Check if user is not registered
    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while creating user!",
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

export default googleAuthFirebase;
