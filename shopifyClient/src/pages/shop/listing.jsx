import React from "react";
import ShopFilter from "@/components/shop/filter";

const ShopListing = () => {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-[300px_1fr] p-4 md:p-6">
      <ShopFilter />
    </div>
  );
};

export default ShopListing;
