import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductRating from "@/components/common/productRating";
import addProductReviewService from "@/services/shop/reviews/addProductReviewService";
import fetchShopProductsService from "@/services/shop/products/fetchShopProductsService";
import { useToast } from "@/hooks/use-toast";
import fetchProductReviewsService from "@/services/shop/reviews/fetchProductReviewsService";
import fetchShopProductDetailsService from "@/services/shop/products/fetchShopProductDetailsService";

const ShopProductDetails = ({
  openShopProductDetails,
  setOpenShopProductDetails,
  productDetails,
  handleAddToCart,
}) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [productRating, setProductRating] = useState(0);

  const { user } = useSelector((state) => state.authReducer);
  const { reviews } = useSelector((state) => state.reviewsReducer);

  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleProductRating = (getProductRating) => {
    setProductRating(getProductRating);
  };

  const handleAddProductReview = () => {
    dispatch(
      addProductReviewService({
        productId: productDetails?.id,
        userId: user?.id,
        userName: user?.name,
        reviewMessage: reviewMessage,
        reviewValue: productRating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchProductReviewsService({ productId: productDetails?.id }));
        dispatch(fetchShopProductDetailsService(productDetails?.id));
        toast({
          title: "Review added successfully!",
        });
      } else {
        setProductRating(0);
        setReviewMessage("");
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (openShopProductDetails === false) {
      setProductRating(0);
      setReviewMessage("");
    }
  }, [openShopProductDetails]);

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(fetchProductReviewsService({ productId: productDetails?.id }));
    }
  }, [productDetails]);

  return (
    <Dialog
      open={openShopProductDetails}
      onOpenChange={setOpenShopProductDetails}
    >
      <DialogContent className="gap-8 grid grid-cols-2 sm:p-12 max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.image}
            width={600}
            height={600}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="">
          <DialogTitle>
            <div>
              <h1 className="font-extrabold text-3xl">
                {productDetails?.title}
              </h1>
              <p className="mt-4 mb-5 text-muted-foreground text02xl">
                {productDetails?.description}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex justify-between items-center">
            <p
              className={`font-bold text-3xl text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="font-bold text-2xl text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <ProductRating
                productRating={productDetails?.rating}
                handleProductRating={handleProductRating}
              />
            </div>
            <span className="text-muted-foreground">
              {productDetails?.rating}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="opacity-60 w-full cursor-not-allowed">
                Out of stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?.id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="mb-4 font-bold text-xl">Reviews</h2>
            <div className="gap-6 grid">
              {reviews && reviews.length ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem?.id}>
                    <Avatar className="border w-10 h-10">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="gap-1 grid">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <ProductRating
                          productRating={reviewItem?.reviewValue}
                          handleProductRating={handleProductRating}
                        />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>No reviews yet</div>
              )}
            </div>
            <div className="flex flex-col gap-6 mt-10">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <ProductRating
                  productRating={productRating}
                  handleProductRating={handleProductRating}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMessage}
                placeholder="Write a review..."
                onChange={(e) => setReviewMessage(e.target.value)}
              />
              <Button
                disabled={reviewMessage.trim() === ""}
                onClick={handleAddProductReview}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopProductDetails;
