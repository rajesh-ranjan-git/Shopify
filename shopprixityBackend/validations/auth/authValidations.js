import vine from "@vinejs/vine";
import { CustomErrorReporter } from "../CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

// Validation for register schema
export const registerSchema = vine.object({
  email: vine.string().email(),
  name: vine.string().minLength(2).maxLength(191),
  password: vine.string().minLength(6).maxLength(191).confirmed(),
  profileImage: vine.string().optional(),
  role: vine.string().optional(),
});

// Validation for login schema
export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

// Validation for Google Auth Firebase schema
export const googleAuthFirebaseSchema = vine.object({
  email: vine.string().email(),
  name: vine.string().minLength(2).maxLength(191),
  password: vine.string().optional(),
  profileImage: vine.string().optional(),
  role: vine.string().optional(),
});
