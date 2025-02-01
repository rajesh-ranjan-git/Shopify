import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import deleteShopCartService from "@/services/shop/cart/deleteShopCartService";
import updateShopCartService from "@/services/shop/cart/updateShopCartService";

const ShopCartContents = ({ cartItem }) => {
  const { user } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const { shopProductList } = useSelector((state) => state.shopProductsReducer);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateCartItems = (getCartItem, typeOfAction) => {
    if (typeOfAction === "increment") {
      let getCurrentCartItems = cartItems || [];

      if (getCurrentCartItems.length > 0) {
        const indexOfCurrentCartItem = getCurrentCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = shopProductList.findIndex(
          (product) => product?.id === getCartItem?.productId
        );

        const getTotalStock =
          shopProductList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity =
            getCurrentCartItems[indexOfCurrentCartItem].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} items can be added for this product!`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }
    dispatch(
      updateShopCartService({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "increment"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
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

  const handleDeleteCartItem = (getCartItem) => {
    dispatch(
      deleteShopCartService({
        userId: user?.id,
        productId: getCartItem.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
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

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.product?.image}
        alt={cartItem?.product?.title}
        className="rounded w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.product?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8"
            disabled={cartItem?.quantity <= 1}
            onClick={() => handleUpdateCartItems(cartItem, "decrement")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8"
            onClick={() => handleUpdateCartItems(cartItem, "increment")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItem?.product?.salePrice > 0
              ? cartItem?.product?.salePrice
              : cartItem?.product?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="mt-1 cursor-pointer"
          size={20}
          onClick={() => handleDeleteCartItem(cartItem)}
        />
      </div>
    </div>
  );
};

export default ShopCartContents;
