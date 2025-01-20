import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "rajesh-ranjan-cloudinary",
  api_key: process.env.CLOUDINARY_API_KEY || "614915147647189",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "T0f0d3sOM_YyGgfauKvAQk5Zp90",
});

const cloudinaryStorage = new multer.memoryStorage();

export const imageUploadHelper = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

export const uploadImage = multer({ cloudinaryStorage });
