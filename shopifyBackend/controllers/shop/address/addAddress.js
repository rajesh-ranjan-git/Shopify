import prisma from "../../../db/db.config.js";

// Add address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    // Validating input
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "UserId is required!",
      });
    }

    if (!address) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Address is required!",
      });
    }

    if (!city) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "City is required!",
      });
    }

    if (!pincode) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Pincode is required!",
      });
    }
    if (!phone) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Phone is required!",
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: userId,
        address: address,
        city: city,
        pincode: pincode,
        phone: phone,
        notes: notes,
      },
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Address added successfully!",
      address: newAddress,
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

export default addAddress;
