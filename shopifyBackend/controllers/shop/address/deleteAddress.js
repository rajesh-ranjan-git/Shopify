import prisma from "../../../db/db.config.js";

// Delete Address
const deleteAddress = async (req, res) => {
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

    // Check if item does not exist
    const itemToDelete = await prisma.address.findFirst({
      where: {
        AND: { userId: userId, id: addressId },
      },
    });

    if (!itemToDelete) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Address not found!",
      });
    }

    // If item is present then delete
    const deletedAddress = await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    if (!deletedAddress) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Unable to delete address!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Address deleted successfully!",
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

export default deleteAddress;
