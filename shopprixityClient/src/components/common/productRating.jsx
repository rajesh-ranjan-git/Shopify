import React from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ProductRating = ({ productRating, handleProductRating }) => {
  return [1, 2, 3, 4, 5].map((rating, index) => (
    <Button
      variant="outline"
      size="icon"
      key={index}
      className={`p-2 rounded-full transition-colors ${
        rating <= productRating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      onClick={handleProductRating ? () => handleProductRating(rating) : null}
    >
      <Star
        className={`w-6 h-6 ${
          rating <= productRating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
};

export default ProductRating;
