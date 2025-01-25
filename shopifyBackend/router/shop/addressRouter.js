import express from "express";
import fetchAddress from "../../controllers/shop/address/fetchAddress.js";
import addAddress from "../../controllers/shop/address/addAddress.js";
import updateAddress from "../../controllers/shop/address/updateAddress.js";
import deleteAddress from "../../controllers/shop/address/deleteAddress.js";

const addressRouter = express.Router();

addressRouter.get("/fetchAddress/:userId", fetchAddress);
addressRouter.post("/addAddress", addAddress);
addressRouter.put("/updateAddress/:userId/:addressId", updateAddress);
addressRouter.delete("/deleteAddress/:userId/:addressId", deleteAddress);

export default addressRouter;
