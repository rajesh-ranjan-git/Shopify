import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { File, UploadCloud, X } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageInput = ({
  productImage,
  setProductImage,
  uploadedProductImageUrl,
  setUploadedProductImageUrl,
}) => {
  const productImageInputRef = useRef(null);

  const handleProductImage = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) setProductImage(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files?.[0];
    if (droppedImage) setProductImage(droppedImage);
  };

  const handleRemoveProductImage = () => {
    setProductImage(null);
    if (productImageInputRef.current) productImageInputRef.current.value = "";
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-md">
      <Label className="block mb-2 font-semibold text-lg">
        Upload Product Image
      </Label>
      <div
        className="border-2 p-4 border-dashed rounded-lg"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Input
          id="productImage"
          type="file"
          className="hidden"
          ref={productImageInputRef}
          onChange={(e) => handleProductImage(e)}
        />
        {!productImage ? (
          <Label
            htmlFor="productImage"
            className="flex flex-col justify-center items-center h-32 cursor-pointer"
          >
            <UploadCloud className="mb-2 w-10 h-10 text-muted-foreground" />
            <span>Drag and Drop or click to upload product image.</span>
          </Label>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <File className="mr-2 w-8 h-8 text-primary" />
            </div>
            <p className="font-medium text-sm">{productImage.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveProductImage()}
            >
              <X className="w-4 h-4" />
              <span className="sr-only"> Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageInput;
