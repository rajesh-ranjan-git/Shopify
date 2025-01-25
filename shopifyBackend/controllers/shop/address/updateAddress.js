import prisma from "../../../db/db.config.js";

// Update Address
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    // Validating input
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "UserId is required!",
      });
    }

    if (!addressId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "AddressId is required!",
      });
    }

    const { formData } = req.body;

    // Check if address already exists
    const existingAddress = await prisma.cart.findFirst({
      where: {
        userId: userId,
        addressId: addressId,
      },
    });

    if (!existingAddress) {
      // If address does not exist
      return res.status(400).json({
        status: 400,
        success: true,
        message: "Address does not exist!",
      });
    }

    // If address present then update
    const updatedAddress = await prisma.cart.update({
      where: {
        userId: userId,
        addressId: addressId,
      },
      data: formData,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Address updated successfully!",
      address: updatedAddress,
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

export default updateAddress;
