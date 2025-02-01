import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkoutImage from "@/assets/account.jpg";
import { useToast } from "@/hooks/use-toast";
import Address from "@/components/shop/address";
import ShopCartContents from "@/components/shop/cartContents";
import { Button } from "@/components/ui/button";
import createOrderService from "@/services/shop/order/createOrderService";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";

const ShopCheckout = () => {
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const { approvalURL } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount = cartItems?.reduce(
    (sum, item) =>
      (sum +=
        (item?.product?.salePrice > 0
          ? item?.product?.salePrice
          : item?.product?.price) * item?.quantity),
    0
  );

  const handleInitiatePaypalPayment = () => {
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select an address to proceed!",
        variant: "destructive",
      });

      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty!",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      orderItems: cartItems.map((item) => ({
        title: item.product.title,
        productId: item.productId,
        image: item.product.image,
        price:
          item.product.salePrice > 0
            ? item.product.salePrice
            : item.product.price,
        quantity: item.quantity,
      })),
      shippingAddress: currentSelectedAddress,
      totalAmount: totalCartAmount,
      orderStatus: "pending",
      payerId: "",
      paymentId: "",
      paymentStatus: "pending",
      paymentMethod: "paypal",
    };

    dispatch(createOrderService(orderData)).then((data) => {
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

  useEffect(() => {
    if (!cartItems) {
      dispatch(fetchShopCartService(user?.id));
    }
  }, [cartItems, user]);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src={checkoutImage}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-5 p-5">
        <div>
          <Address
            currentSelectAddressId={currentSelectedAddress?.id}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
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
