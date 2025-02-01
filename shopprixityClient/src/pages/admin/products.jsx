import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addProductFormElements } from "@/config/config";
import AdminProductCard from "@/components/admin/productCard";
import ProductImageInput from "@/components/admin/productImageInput";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import fetchAllProductsService from "@/services/admin/products/fetchAllProductsService";
import addProductService from "@/services/admin/products/addProductService";
import editProductService from "@/services/admin/products/editProductService";
import deleteProductService from "@/services/admin/products/deleteProductService";

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
  const [productImageUploading, setProductImageUploading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProductsReducer);

  const dispatch = useDispatch();

  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProductService({ id: currentEditedId, formData })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProductsService());
            setOpenCreateProductsDialog(false);
            setProductImage(null);
            setFormData(initialFormData);
            setCurrentEditedId(null);
            toast({
              title: data?.payload?.message,
            });
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        }
      );
    } else {
      dispatch(
        addProductService({ ...formData, image: uploadedProductImageUrl })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProductsService());
          setOpenCreateProductsDialog(false);
          setProductImage(null);
          setFormData(initialFormData);
          toast({
            title: data?.payload?.message,
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  };

  const handleProductDelete = (currentProductId) => {
    dispatch(deleteProductService(currentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProductsService());
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProductsService());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-end mb-5 w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="gap-4 grid md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductCard
                product={product}
                key={product.id}
                currentEditedId={currentEditedId}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleProductDelete={handleProductDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageInput
            productImage={productImage}
            setProductImage={setProductImage}
            uploadedProductImageUrl={uploadedProductImageUrl}
            setUploadedProductImageUrl={setUploadedProductImageUrl}
            productImageUploading={productImageUploading}
            setProductImageUploading={setProductImageUploading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
