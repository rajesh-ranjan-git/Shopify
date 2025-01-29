import { imageUploadHelper } from "../../../helpers/cloudinary.js";

// Product image upload to cloudinary using multer
const productImageUpload = async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + base64;
    const result = await imageUploadHelper(url);

    // Check if image is uploaded
    if (result) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Image uploaded successfully!",
        result: result,
      });
    }

    // Check if image is not uploaded
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error occurred while uploading image!",
      error: error,
    });
  } catch (error) {
    // Check for errors
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

export default productImageUpload;
