import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminProductCard = ({
  product,
  currentEditedId,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  handleProductDelete,
}) => {
  return (
    <Card className="mx-auto w-full max-w-sm cursor-pointer">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="rounded-t-lg w-full h-[300px] object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 font-bold text-xl">{product?.title}</h2>
          <div className="flex justify-between mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="font-bold text-lg">₹{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?.id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleProductDelete(product?.id)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductCard;
