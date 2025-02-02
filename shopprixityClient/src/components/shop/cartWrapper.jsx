import React from "react";
import { useNavigate } from "react-router-dom";
import ShopCartContents from "./cartContents";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ShopCartWrapper = ({ cartItems, setOpenCart, setOpenMobileNav }) => {
  const navigate = useNavigate();

  const totalCartAmount = cartItems.reduce(
    (sum, item) =>
      (sum +=
        (item?.product?.salePrice > 0
          ? item?.product?.salePrice
          : item?.product?.price) * item?.quantity),
    0
  );

  const handleCheckout = () => {
    navigate("/shop/checkout");
    setOpenCart(false);
    setOpenMobileNav(false);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 mt-8">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ShopCartContents cartItem={item} key={item?.id} />
          ))
        ) : (
          <p className="text-2xl text-bold text-center">
            Nothing in your cart!
          </p>
        )}
      </div>
      <div className="space-y-4 mt-8">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <SheetDescription></SheetDescription>
      <Button className="mt-6 w-full" onClick={() => handleCheckout()}>
        Proceed to checkout
      </Button>
    </SheetContent>
  );
};

export default ShopCartWrapper;
