import prisma from "../../../db/db.config.js";

// Update Address
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { address, city, pincode, phone, notes } = req.body;

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

    // Check if address already exists
    const existingAddress = await prisma.address.findFirst({
      where: {
        AND: { userId: userId, id: addressId },
      },
    });

    if (!existingAddress) {
      // If address does not exist
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Address does not exist!",
      });
    }

    // If address present then update
    const updatedAddress = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        address: address,
        city: city,
        pincode: pincode,
        phone: phone,
        notes: notes,
      },
    });

    if (!updatedAddress) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Unable to update address!",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Address updated successfully!",
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
