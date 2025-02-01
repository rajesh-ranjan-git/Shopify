import React, { useEffect, useRef } from "react";
import axios from "axios";
import { File, UploadCloud, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { adminProductImageUploadApi } from "@/services/apiUrls";

const ProductImageInput = ({
  productImage,
  setProductImage,
  uploadedProductImageUrl,
  setUploadedProductImageUrl,
  productImageUploading,
  setProductImageUploading,
  isEditMode,
  isSliderImageUpload = false,
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

  const uploadImageToCloudinary = async () => {
    setProductImageUploading(true);

    const adminProductsImageUploadFormData = new FormData();
    adminProductsImageUploadFormData.append("myFile", productImage);

    const adminProductsImageUploadResponse = await axios.post(
      adminProductImageUploadApi,
      adminProductsImageUploadFormData
    );

    if (adminProductsImageUploadResponse)
      setUploadedProductImageUrl(
        adminProductsImageUploadResponse.data.result.url
      );

    setProductImageUploading(false);
  };

  useEffect(() => {
    if (productImage !== null) uploadImageToCloudinary();
  }, [productImage]);

  return (
    <div
      className={`mt-4 w-full ${isSliderImageUpload ? "" : "mx-auto max-w-md"}`}
    >
      <Label className="block mb-2 font-semibold text-lg">Upload Image</Label>
      <div
        className={`${
          isEditMode ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } border-2 p-4 border-dashed rounded-lg`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Input
          id="image"
          type="file"
          className="hidden"
          disabled={isEditMode}
          ref={productImageInputRef}
          onChange={(e) => handleProductImage(e)}
        />
        {!productImage ? (
          <Label
            htmlFor="image"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col justify-center items-center h-32`}
          >
            <UploadCloud className="mb-2 w-10 h-10 text-muted-foreground" />
            <span>Drag and Drop or click to upload product image.</span>
          </Label>
        ) : productImageUploading ? (
          <Skeleton className="bg-grey-100 rounded-full w-[100px] h-[20px]" />
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
