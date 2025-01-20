import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminProductCard = () => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <div>
        <div className="relative">
          <img
            // src={product?.image}
            src="https://images4.alphacoders.com/108/1082550.jpg"
            // alt={product.title}
            alt="Some title"
            className="rounded-t-lg w-full h-[300px] object-cover"
          />
        </div>
        <CardContent>
          {/* <h2 className="mb-2 font-bold text-xl">{product?.title}</h2> */}
          <h2 className="mb-2 font-bold text-xl">Some Title</h2>
          <div className="flex justify-between mb-2">
            {/* <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span> */}
            <span className="font-semibold text-lg text-primary line-through">
              ₹200
            </span>
            {/* {product?.salePrice > 0 ? (
              <span className="font-bold text-lg">${product?.salePrice}</span>
            ) : null} */}
            <span className="font-bold text-lg">₹100</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductCard;
