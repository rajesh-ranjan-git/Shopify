import prisma from "../../../db/db.config.js";

// Add items to cart
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await prisma.orders.findUnique({
      where: {
        orderId: orderId,
      },
    });
    if (!order) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Order not found!",
      });
    }

    const cart = await prisma.cart.delete({
      where: {
        id: order.cartId,
      },
    });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    order = await prisma.orders.update({
      where: {
        orderId: orderId,
      },
      data: {
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paymentId: order.paymentId,
        payerId: order.payerId,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Order confirmed!",
      order: order,
    });
  } catch (error) {
    // Check for errors
    console.log("error : ", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default capturePayment;
