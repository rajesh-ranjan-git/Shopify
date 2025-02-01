import prisma from "../../../db/db.config.js";

// Capture payment after order creation
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    // Find order with orderId
    let order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });

    // If order not found
    if (!order) {
      return res.status(400).json({
        status: 404,
        success: false,
        message: "Order not found!",
      });
    }

    // Delete cart if order found
    // const cart = await prisma.cart.delete({
    //   where: {
    //     id: order.cartId,
    //   },
    // });

    // Update order locally if found
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    let orderItems = await prisma.orderItems.findMany({
      where: {
        orderId: order?.id,
      },
    });

    for (let item of orderItems) {
      let product = await prisma.products.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `Not enough stock for this product ${product.title}!`,
        });
      }

      product.totalStock -= item.quantity;

      await prisma.products.update({
        where: {
          id: item.productId,
        },
        data: {
          totalStock: product.totalStock,
        },
      });
    }

    order = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paymentId: order.paymentId,
        payerId: order.payerId,
      },
    });

    console.log("updated order from capturePayment : ", order);

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
