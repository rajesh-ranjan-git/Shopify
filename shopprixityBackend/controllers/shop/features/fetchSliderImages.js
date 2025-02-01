import prisma from "../../../db/db.config.js";

const fetchSliderImages = async (req, res) => {
  try {
    // Fetch slider image
    const sliderImages = await prisma.features.findMany({});

    // Check if fetching slider image not successful
    if (!sliderImages) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Could not fetch slider images!",
      });
    }

    // Check if fetching slider images is successful
    return res.status(201).json({
      status: 201,
      success: true,
      message: "Slider images fetched successfully!",
      sliderImages: sliderImages,
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

export default fetchSliderImages;
