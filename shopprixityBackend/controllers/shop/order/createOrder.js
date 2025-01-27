import prisma from "../../../db/db.config.js";
import paypal from "../../../helpers/paypal.js";

// Add items to cart
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      totalAmount,
      orderStatus,
      payerId,
      paymentId,
      paymentStatus,
      paymentMethod,
    } = req.body;

    const createPaymentJSON = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypalReturnPage",
        cancel_url: "http://localhost:5173/shop/paypalCancelPage",
      },
      transactions: {
        item_list: {
          items: orderItems.map((item) => ({
            name: item.title,
            sku: item.productId,
            price: item.price.toFixed(2),
            currency: "INR",
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: "INR",
          total: totalAmount.toFixed(2),
        },
        description: "Order Description",
      },
    };

    paypal.payment.create(createPaymentJSON, async (error, paymentInfo) => {
      if (error) {
        console.log("paypal error : ", error);
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Something went wrong while creating paypal payment!",
        });
      } else {
        const newShippingAddress = await prisma.shippingAddress.create({
          data: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            pincode: shippingAddress.pincode,
            phone: shippingAddress.phone,
            notes: shippingAddress.notes,
          },
        });

        const newOrder = await prisma.orders.create({
          data: {
            orderNumber: Number(Math.random() * 10000000),
            userId: userId,
            orderItems: orderItems,
            totalAmount: totalAmount,
            orderStatus: orderStatus,
            payerId: payerId,
            paymentId: paymentId,
            paymentStatus: paymentStatus,
            paymentMethod: paymentMethod,
            addressId: newShippingAddress.id,
          },
        });

        const newOrderItems = orderItems.map(async (item) => {
          item = await prisma.orderItems.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.quantity,
              image: item.image,
            },
          });
        });

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        return res.status(201).json({
          success: true,
          approvalURL,
          orderId: order.id,
          message: "Order created successfully!",
        });
      }
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

export default createOrder;
