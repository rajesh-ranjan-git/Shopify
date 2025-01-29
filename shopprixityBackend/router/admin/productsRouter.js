import express from "express";
import { uploadImage } from "../../helpers/cloudinary.js";
import productImageUpload from "../../controllers/admin/product/productImageUpload.js";
import addProduct from "../../controllers/admin/product/addProduct.js";
import editProduct from "../../controllers/admin/product/editProduct.js";
import deleteProduct from "../../controllers/admin/product/deleteProduct.js";
import fetchAllProducts from "../../controllers/admin/product/fetchAllProducts.js";

const adminProductsRouter = express.Router();

adminProductsRouter.post(
  "/uploadImage",
  uploadImage.single("myFile"),
  productImageUpload
);

adminProductsRouter.get("/fetchAllProducts", fetchAllProducts);
adminProductsRouter.post("/addProduct", addProduct);
adminProductsRouter.put("/editProduct/:id", editProduct);
adminProductsRouter.delete("/deleteProduct/:id", deleteProduct);

export default adminProductsRouter;
