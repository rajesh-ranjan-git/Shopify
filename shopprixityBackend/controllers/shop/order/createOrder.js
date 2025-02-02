import prisma from "../../../db/db.config.js";
import paypal from "../../../helpers/paypal.js";

// Create order
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

    // Create payment JSON for paypal
    const createPaymentJSON = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypalReturnPage",
        cancel_url: "http://localhost:5173/shop/paypalCancelPage",
      },
      transactions: [
        {
          item_list: {
            items: orderItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order Description",
        },
      ],
    };

    // Create paypal payment
    paypal.payment.create(createPaymentJSON, async (error, paymentInfo) => {
      // Check if error occurred during paypal payment process
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Something went wrong while creating paypal payment!",
        });
      } else {
        // Add shipping address if no error while paypal payment process
        const newShippingAddress = await prisma.shippingAddress.create({
          data: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            pincode: shippingAddress.pincode,
            phone: shippingAddress.phone,
            notes: shippingAddress.notes,
          },
        });

        // Create new order
        const newOrder = await prisma.orders.create({
          data: {
            userId: userId,
            totalAmount: totalAmount,
            orderStatus: orderStatus,
            payerId: payerId,
            paymentId: paymentId,
            paymentStatus: paymentStatus,
            paymentMethod: paymentMethod,
            addressId: newShippingAddress.id,
          },
        });

        // Add order items
        const newOrderItems = orderItems.map(async (item) => {
          item = await prisma.orderItems.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              title: item.title,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            },
          });
        });

        // Get approval URL from paypal
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        return res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder.id,
          message: "Order created successfully!",
        });
      }
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

export default createOrder;
