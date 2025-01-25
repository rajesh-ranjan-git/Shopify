import React from "react";
import checkoutImage from "@/assets/account.jpg";
import Address from "@/components/shop/address";
import { useSelector } from "react-redux";
import ShopCartContents from "@/components/shop/cartContents";
import { Button } from "@/components/ui/button";

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const totalCartAmount = cartItems.reduce(
    (sum, item) =>
      (sum +=
        (item?.product?.salePrice > 0
          ? item?.product?.salePrice
          : item?.product?.price) * item?.quantity),
    0
  );

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src={checkoutImage}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((cartItem) => (
                <ShopCartContents cartItem={cartItem} />
              ))
            : null}
          <div className="space-y-4 mt-8">
            <div className="flex justify-between">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full">Pay with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
