import ShopProductCard from "@/components/shop/productCard";
import ShopProductDetails from "@/components/shop/productDetails";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import addToShopCartService from "@/services/shop/cart/addToShopCartService";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";
import fetchShopProductDetailsService from "@/services/shop/products/fetchShopProductDetailsService";
import searchShopProductsService from "@/services/shop/products/searchShopProductsService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openShopProductDetails, setOpenShopProductDetails] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.authReducer);
  const { shopProductDetails, searchShopProducts, resetSearchShopProducts } =
    useSelector((state) => state.shopProductsReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleShopProductDetails = (getCurrentProductId) => {
    dispatch(fetchShopProductDetailsService(getCurrentProductId));
    setOpenShopProductDetails(true);
  };

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length > 0) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} items can be added for this product!`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToShopCartService({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchShopCartService(user?.id));
        toast({
          title: "Item added to cart!",
        });
      }
    });
  };

  useEffect(() => {
    if (
      searchKeyword &&
      searchKeyword.trim() !== "" &&
      searchKeyword.trim().length > 3
    ) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?searchKeyword=${searchKeyword}`));
        dispatch(searchShopProductsService(searchKeyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?searchKeyword=${searchKeyword}`));
      dispatch(resetSearchShopProducts());
    }
  }, [searchKeyword]);

  //   useEffect(() => {
  //     if (shopProductDetails !== null) setOpenShopProductDetails(true);
  //   }, [shopProductDetails]);

  return (
    <div className="mx-auto px-4 md:px-6 py-8 container">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            className="py-6"
            value={searchKeyword}
            placeholder="Search products..."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {!(searchShopProducts && searchShopProducts.length) && (
        <h1 className="font-extrabold text-5xl">No products found!</h1>
      )}

      <div className="gap-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 sm:grid-col-2">
        {searchShopProducts.map((product) => (
          <ShopProductCard
            product={product}
            handleShopProductDetails={handleShopProductDetails}
            handleAddToCart={handleAddToCart}
            key={product.id}
          />
        ))}
      </div>

      <ShopProductDetails
        openShopProductDetails={openShopProductDetails}
        setOpenShopProductDetails={setOpenShopProductDetails}
        productDetails={shopProductDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Search;
