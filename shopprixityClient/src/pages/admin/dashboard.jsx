import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ProductImageInput from "@/components/admin/productImageInput";
import addSliderImageService from "@/services/common/addSliderImageService";
import fetchSliderImagesService from "@/services/common/fetchSliderImagesService";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [productImage, setProductImage] = useState(null);
  const [uploadedProductImageUrl, setUploadedProductImageUrl] = useState("");
  const [productImageUploading, setProductImageUploading] = useState(false);

  const { sliderImages } = useSelector((state) => state.featuresReducer);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const handleUploadSliderImage = () => {
    dispatch(
      addSliderImageService({ sliderImage: uploadedProductImageUrl })
    ).then((data) => {
      if (data?.payload.success) {
        toast({
          title: "Slider image added successfully!",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchSliderImagesService());
  }, [dispatch]);

  console.log("sliderImages : ", sliderImages);

  return (
    <div>
      <h1>Upload Slider Image</h1>
      <ProductImageInput
        productImage={productImage}
        setProductImage={setProductImage}
        uploadedProductImageUrl={uploadedProductImageUrl}
        setUploadedProductImageUrl={setUploadedProductImageUrl}
        productImageUploading={productImageUploading}
        setProductImageUploading={setProductImageUploading}
        isSliderImageUpload={true}
      />

      <Button className="mt-5 w-full" onClick={handleUploadSliderImage}>
        Upload Slider Image
      </Button>
    </div>
  );
};

export default AdminDashboard;
