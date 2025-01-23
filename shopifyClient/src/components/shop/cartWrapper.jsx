import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

const ShopCartWrapper = () => {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 mt-8"></div>
      <div className="space-y-4 mt-8">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">₹1000</span>
        </div>
      </div>
      <Button className="mt-6 w-full">Checkout</Button>
    </SheetContent>
  );
};

export default ShopCartWrapper;
