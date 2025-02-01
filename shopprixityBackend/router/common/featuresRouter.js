import { Router } from "express";
import addSliderImage from "../../controllers/admin/features/addSliderImage.js";
import fetchSliderImages from "../../controllers/shop/features/fetchSliderImages.js";

const featuresRouter = Router();

// Features router
featuresRouter.post("/addSliderImage", addSliderImage);
featuresRouter.get("/fetchSliderImages", fetchSliderImages);

export default featuresRouter;
