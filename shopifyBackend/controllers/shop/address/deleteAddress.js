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
    const itemToDelete = await prisma.cart.findFirst({
      where: {
        userId: userId,
        addressId: addressId,
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
    const deletedAddress = await prisma.cart.delete({
      where: {
        userId: userId,
        addressId: addressId,
      },
    });

    if (!deletedAddress) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Could not delete address!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Address deleted successfully!",
      cart: cart,
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
