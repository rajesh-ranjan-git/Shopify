import React, { useEffect, useState } from "react";
import { House, LogOut, Menu, ShoppingCart, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shopHeaderMenuItems } from "@/config/config";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logoutUserService from "@/services/auth/logoutUserService";
import ShopCartWrapper from "./cartWrapper";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";
import { Label } from "@/components/ui/label";

const MenuItems = ({ setOpenMobileNav }) => {
  const navigate = useNavigate();

  const handleNavigateToListing = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
    setOpenMobileNav(false);
  };

  return (
    <nav className="flex lg:flex-row flex-col lg:items-center gap-6 mb-3 lg:mb-0">
      {shopHeaderMenuItems.map((menuItem) => (
        <Label
          className="font-medium text-sm cursor-pointer"
          key={menuItem.id}
          onClick={() => handleNavigateToListing(menuItem)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const [openCart, setOpenCart] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserService());
  };

  useEffect(() => {
    dispatch(fetchShopCartService(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-4">
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <Button variant="outline" size="icon" onClick={() => setOpenCart(true)}>
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">Cart</span>
        </Button>
        <ShopCartWrapper
          cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
          setOpenCart={setOpenCart}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black font-extrabold text-white">
              {user?.name[0].toUpperCase()}
              {/* RR */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.name}!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserRound className="mr-2 w-4 h-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLogout()}>
            <LogOut className="mr-2 w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShopHeader = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  return (
    <header className="top-0 z-40 sticky bg-background border-b w-full">
      <div className="flex justify-between items-center px-4 md:px-6 h-16">
        <Link className="flex items-center gap-2" to="/shop/home">
          <House className="w-6 h-6" />
          <span className="font-bold">Shopprixity</span>
        </Link>
        <Sheet open={openMobileNav} onOpenChange={setOpenMobileNav}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems setOpenMobileNav={setOpenMobileNav} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="lg:block hidden">
          <div>
            <MenuItems setOpenMobileNav={setOpenMobileNav} />
          </div>
        </div>
        <div className="lg:block hidden">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
