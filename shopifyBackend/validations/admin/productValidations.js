import vine from "@vinejs/vine";
import { CustomErrorReporter } from "../CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

const productSchema = vine.object({
  title: vine.string().minLength(2).maxLength(191),
  description: vine.string().minLength(2),
  category: vine.string(),
  brand: vine.string(),
  price: vine.number(),
  salePrice: vine.number().optional(),
  totalStock: vine.number(),
  image: vine.string().optional(),
});

export default productSchema;
