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
      orderDate,
      orderUpdateDate,
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
            sju: item.productId,
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
          message: "Something went wrong while create paypal payment!",
        });
      } else {
        const order = prisma.orders.create({
          data: {
            orderNumber,
            userId,
            orderItems,
            totalAmount,
            orderStatus,
            payerId,
            paymentId,
            paymentStatus,
            paymentMethod,
            addressId,
          },
        });
      }
    });

    // Check if item already exists
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    let cart;

    if (!existingCartItem) {
      // If no cart items then create cart and add items
      cart = await prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity,
        },
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "Item added to cart!",
        cart: cart,
      });
    }

    // If item present in cart then increase the quantity
    cart = await prisma.cart.update({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Cart Items updated!",
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
