import express from "express";
import { uploadImage } from "../../helpers/cloudinary.js";
import handleImageUpload from "../../controllers/admin/productsController.js";

const adminProductsRouter = express.Router();

adminProductsRouter.post(
  "/uploadImage",
  uploadImage.single("myFile"),
  handleImageUpload
);

export default adminProductsRouter;
