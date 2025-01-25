import prisma from "../../../db/db.config.js";

// Fetch Address
const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validating input
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "UserId is required!",
      });
    }

    // Check if address is present
    const addressList = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
    });

    if (addressList && addressList.length > 0) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Address fetched successfully!",
        addressList: addressList,
      });
    }

    // If address is not present
    return res.status(404).json({
      status: 404,
      success: false,
      message: "No address found!",
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

export default fetchAddress;
