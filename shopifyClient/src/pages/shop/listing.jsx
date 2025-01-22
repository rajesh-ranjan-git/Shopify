import React, { useEffect } from "react";
import ShopFilter from "@/components/shop/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import fetchAllShopProductsService from "@/services/shop/fetchAllShopProducts";
import ShopProductCard from "@/components/shop/productCard";

const ShopListing = () => {
  const dispatch = useDispatch();
  const { shopProductList } = useSelector((state) => state.shopProductsReducer);

  console.log("shopProductList : ", shopProductList);

  // Fetch list of products
  useEffect(() => {
    dispatch(fetchAllShopProductsService());
  }, [dispatch]);

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-[300px_1fr] p-4 md:p-6">
      <ShopFilter />
      <div className="bg-background shadow-sm rounded-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-extrabold text-lg">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {shopProductList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shopProductList && shopProductList.length > 0
            ? shopProductList.map((product) => (
                <ShopProductCard product={product} key={product.id} />
              ))
            : null}
          {/* {staticProductList && staticProductList.length > 0
          ? staticProductList.map((product) => (
              <ShopProductCard
                product={product}
                key={product.id}
              />
            ))
          : null} */}
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
