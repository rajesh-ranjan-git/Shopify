import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config/config";
import ProductImageInput from "@/components/admin/productImageInput";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [productImage, setProductImage] = useState(null);
  const [uploadedProductImageUrl, setUploadedProductImageUrl] = useState("");

  const onSubmit = () => {};

  return (
    <>
      <div className="flex justify-end mb-5 w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="gap-4 grid md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageInput
            productImage={productImage}
            setProductImage={setProductImage}
            uploadedProductImageUrl={uploadedProductImageUrl}
            setUploadedProductImageUrl={setUploadedProductImageUrl}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
