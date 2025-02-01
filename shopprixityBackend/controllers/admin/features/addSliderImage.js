import prisma from "../../../db/db.config.js";

const addSliderImage = async (req, res) => {
  try {
    const { sliderImage } = req.body;

    // Add slider image
    const image = await prisma.features.create({
      data: {
        sliderImage: sliderImage,
      },
    });

    // Check if slider image not added
    if (!image) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Could not add slider image!",
      });
    }

    // Check if slider image added
    return res.status(201).json({
      status: 201,
      success: true,
      message: "Slider image added successfully!",
      sliderImage: image,
    });
  } catch (error) {
    // Check for errors
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default addSliderImage;
