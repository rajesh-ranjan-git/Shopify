import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config/config";

const ShopProductCard = ({ product, handleShopProductDetails }) => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <div onClick={() => handleShopProductDetails(product?.id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="rounded-t-lg w-full h-[300px] object-cover"
          />
          {product?.salePrice > 0 ? (
            <Badge className="top-2 left-2 absolute bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 font-bold text-xl">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-muted-foreground text-sm">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="font-semibold text-lg text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShopProductCard;
