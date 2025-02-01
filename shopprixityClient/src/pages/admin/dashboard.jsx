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
        dispatch(fetchSliderImagesService());
        toast({
          title: "Slider image added successfully!",
        });
        setUploadedProductImageUrl("");
        setProductImage(null);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchSliderImagesService());
  }, [dispatch]);

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

      <div className="flex flex-col mt-5 w-full">
        {sliderImages && sliderImages.length > 0
          ? sliderImages.map((slide) => (
              <img
                src={slide?.sliderImage}
                key={slide?.id}
                className="my-2 rounded-lg w-full h-full object-cover"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
