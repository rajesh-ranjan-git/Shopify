import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bannerOne from "@/assets/banner-1.webp";
import bannerTwo from "@/assets/banner-2.webp";
import bannerThree from "@/assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { brands, categories } from "@/config/config";
import { Card, CardContent } from "@/components/ui/card";
import ShopProductCard from "@/components/shop/productCard";
import fetchShopProductsService from "@/services/shop/products/fetchShopProductsService";
import fetchShopProductDetailsService from "@/services/shop/products/fetchShopProductDetailsService";
import addToShopCartService from "@/services/shop/cart/addToShopCartService";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";
import { useToast } from "@/hooks/use-toast";
import ShopProductDetails from "@/components/shop/productDetails";

const ShopHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openShopProductDetails, setOpenShopProductDetails] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  const { shopProductList, shopProductDetails } = useSelector(
    (state) => state.shopProductsReducer
  );
  const { toast } = useToast();

  const slides = [bannerOne, bannerTwo, bannerThree];

  const dispatch = useDispatch();

  const handleNavigateToListing = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  const handleShopProductDetails = (getCurrentProductId) => {
    dispatch(fetchShopProductDetailsService(getCurrentProductId));
    setOpenShopProductDetails(true);
  };

  const handleAddToCart = (getCurrentProductId) => {
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
    dispatch(
      fetchShopProductsService({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, [2000]);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px]">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } top-0 left-0 absolute w-full h-full transition-opacity duration-1000 object-cover`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="top-1/2 left-4 absolute bg-white/80 rounded-full transform -translate-y-1/2"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="top-1/2 right-4 absolute bg-white/80 rounded-full transform -translate-y-1/2"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="bg-gray-50 py-12">
        <div className="mx-auto px-4 container">
          <h2 className="mb-8 font-bold text-3xl text-center">
            Shop by Category
          </h2>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-5 lg:grid-col-6">
            {categories.map((category) => (
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                key={category.id}
                onClick={() => {
                  handleNavigateToListing(category, "category");
                }}
              >
                <CardContent className="flex flex-col justify-center items-center p-6">
                  <category.icon className="mb-4 w-12 h-12 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto px-4 container">
          <h2 className="mb-8 font-bold text-3xl text-center">
            Shop by Brands
          </h2>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-5 lg:grid-col-6">
            {brands.map((brand) => (
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                key={brand.id}
                onClick={() => {
                  handleNavigateToListing(brand, "brand");
                }}
              >
                <CardContent className="flex flex-col justify-center items-center p-6">
                  <brand.icon className="mb-4 w-12 h-12 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto px-4 container">
          <h2 className="mb-8 font-bold text-3xl text-center">
            Featured Products
          </h2>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-5 lg:grid-col-6">
            {shopProductList && shopProductList.length > 0
              ? shopProductList.map((product) => (
                  <ShopProductCard
                    product={product}
                    handleShopProductDetails={handleShopProductDetails}
                    handleAddToCart={handleAddToCart}
                    key={product.id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ShopProductDetails
        openShopProductDetails={openShopProductDetails}
        setOpenShopProductDetails={setOpenShopProductDetails}
        productDetails={shopProductDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShopHome;
