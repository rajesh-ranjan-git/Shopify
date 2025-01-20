import express from "express";
import { uploadImage } from "../../helpers/cloudinary.js";
import productImageUpload from "../../controllers/admin/productImageUpload.js";
import addProduct from "../../controllers/admin/addProduct.js";
import editProduct from "../../controllers/admin/editProduct.js";
import deleteProduct from "../../controllers/admin/deleteProduct.js";
import fetchAllProducts from "../../controllers/admin/fetchAllProducts.js";

const adminProductsRouter = express.Router();

adminProductsRouter.post(
  "/uploadImage",
  uploadImage.single("myFile"),
  productImageUpload
);

adminProductsRouter.post("/fetchAllProducts", fetchAllProducts);
adminProductsRouter.post("/addProduct", addProduct);
adminProductsRouter.post("/editProduct", editProduct);
adminProductsRouter.post("/deleteProduct", deleteProduct);

export default adminProductsRouter;
