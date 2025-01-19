import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginSchema,
  registerSchema,
} from "../../validations/auth/authValidations.js";
import prisma from "../../db/db.config.js";

// Register user
export const register = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(body);

    // Check if email already exists
    const findUser = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (findUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email already exists!",
      });
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    const user = await prisma.users.create({
      data: payload,
    });

    if (user) {
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

      return res.status(200).json({
        status: 200,
        success: true,
        message: "User created successfully!",
        access_token: `Bearer ${token}`,
        user: user,
      });
    }

    return res.status(400).json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while creating user!",
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

export const login = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);

    // Find user
    const user = await prisma.users.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist!",
      });
    } else {
      // Decrypt password
      if (!bcrypt.compareSync(payload.password, user.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid credentials!",
        });
      }
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

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Logged in successfully!",
        access_token: `Bearer ${token}`,
        user: user,
      });
    }
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
