import prisma from "../../../db/db.config.js";
import paypal from "../../../helpers/paypal.js";

// Add items to cart
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      orderItems,
      shippingAddress,
      totalAmount,
      orderStatus,
      payerId,
      paymentId,
      paymentStatus,
      paymentMethod,
    } = req.body;

    console.log("userId : ", userId);
    console.log("cartId : ", cartId);
    console.log("orderItems : ", orderItems);
    console.log("shippingAddress : ", shippingAddress);
    console.log("totalAmount : ", totalAmount);
    console.log("orderStatus : ", orderStatus);
    console.log("payerId : ", payerId);
    console.log("paymentId : ", paymentId);
    console.log("paymentStatus : ", paymentStatus);
    console.log("paymentMethod : ", paymentMethod);

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

    console.log("createPaymentJSON : ", createPaymentJSON);

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

        console.log("newShippingAddress : ", newShippingAddress);

        const newOrder = await prisma.orders.create({
          data: {
            userId: userId,
            cartId: cartId,
            totalAmount: totalAmount,
            orderStatus: orderStatus,
            payerId: payerId,
            paymentId: paymentId,
            paymentStatus: paymentStatus,
            paymentMethod: paymentMethod,
            addressId: newShippingAddress.id,
          },
        });

        console.log("newOrder : ", newOrder);

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

        console.log("newOrderItems : ", newOrderItems);

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        console.log("approvalURL : ", approvalURL);

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
    console.log("error : ", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default createOrder;
