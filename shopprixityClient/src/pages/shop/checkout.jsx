import React, { useEffect, useState } from "react";
import checkoutImage from "@/assets/account.jpg";
import Address from "@/components/shop/address";
import { useDispatch, useSelector } from "react-redux";
import ShopCartContents from "@/components/shop/cartContents";
import { Button } from "@/components/ui/button";
import createOrderService from "@/services/shop/order/createOrderService";

const ShopCheckout = () => {
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const { approvalURL } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();

  const totalCartAmount = cartItems?.reduce(
    (sum, item) =>
      (sum +=
        (item?.product?.salePrice > 0
          ? item?.product?.salePrice
          : item?.product?.price) * item?.quantity),
    0
  );

  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user?.id,
      orderItems: cartItems.map((item) => ({
        title: item.title,
        productId: item.productId,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      cartId: cartItems?.id,
      shippingAddress: currentSelectedAddress,
      totalAmount: totalCartAmount,
      orderStatus: "pending",
      payerId: "",
      paymentId: "",
      paymentStatus: "pending",
      paymentMethod: "paypal",
    };

    dispatch(createOrderService(orderData)).then((data) => {
      console.log("data : ", data);
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src={checkoutImage}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <ShopCartContents cartItem={cartItem} key={cartItem?.id} />
            ))
          ) : (
            <p className="text-2xl text-bold text-center">
              Nothing in your cart!
            </p>
          )}
          <div className="space-y-4 mt-8">
            <div className="flex justify-between">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Pay with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
