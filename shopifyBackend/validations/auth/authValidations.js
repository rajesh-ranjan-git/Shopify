import vine from "@vinejs/vine";
import { CustomErrorReporter } from "../CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  email: vine.string().email(),
  name: vine.string().minLength(2).maxLength(191),
  password: vine.string().minLength(6).maxLength(191).confirmed(),
  role: vine.string().optional(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
