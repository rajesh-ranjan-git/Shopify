import React from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ProductRating = ({ productRating, handleProductRating }) => {
  return [1, 2, 3, 4, 5].map((rating, index) => (
    <Star
      key={index}
      className={`w-6 h-6 ${
        handleProductRating
          ? "cursor-pointer hover:fill-black hover:text-black"
          : ""
      } text-secondary  ${rating <= productRating ? " fill-secondary " : ""}`}
      onClick={handleProductRating ? () => handleProductRating(rating) : null}
    />
  ));
};

export default ProductRating;
