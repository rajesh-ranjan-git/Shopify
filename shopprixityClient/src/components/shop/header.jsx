import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { RiMenu3Fill, RiShoppingCartFill } from "react-icons/ri";
import { HiHomeModern } from "react-icons/hi2";
import { MdAccountBalance } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopHeaderMenuItems } from "@/config/config";
import { toast } from "@/hooks/use-toast";
import ShopCartWrapper from "./cartWrapper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import logoutUserService from "@/services/auth/logoutUserService";
import fetchShopCartService from "@/services/shop/cart/fetchShopCartService";

const MenuItems = ({ setOpenMobileNav }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchparams, setSearchParams] = useSearchParams();

  const handleNavigateToListing = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);

    setOpenMobileNav(false);
  };

  return (
    <nav className="flex lg:flex-row flex-col lg:items-center gap-6 mb-3 lg:mb-0">
      {shopHeaderMenuItems.map((menuItem) => (
        <Label
          className="flex gap-1 item-center font-medium text-sm cursor-pointer"
          key={menuItem.id}
          onClick={() => handleNavigateToListing(menuItem)}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ setOpenMobileNav }) => {
  const [openCart, setOpenCart] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user } = useSelector((state) => state.authReducer);
  const { cartItems } = useSelector((state) => state.shopCartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutUserService()).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
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

  useEffect(() => {
    dispatch(fetchShopCartService(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (cartItems) {
      const cartCount = cartItems.reduce((sum, curr) => sum + curr.quantity, 0);
      setCartItemsCount(cartCount);
    }
  }, [cartItems]);

  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-4">
      <Separator className="md:hidden" />
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <div
          className="w-full cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <Button
            variant="outline"
            size="icon"
            className="relative hover:bg-primary rounded-full"
          >
            <RiShoppingCartFill className="w-6 h-6" />
            <Badge className="top-[-0.6rem] right-[-0.8rem] absolute hover:border-white bg-destructive px-1.5 rounded-full">
              {cartItemsCount}
            </Badge>
          </Button>
          <span className="md:hidden ml-4 font-medium text-md">Cart</span>
        </div>
        <ShopCartWrapper
          cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
          setOpenCart={setOpenCart}
          setOpenMobileNav={setOpenMobileNav}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <Avatar className="bg-primary cursor-pointer">
              <AvatarFallback className="bg-primary font-extrabold text-white">
                {user?.name[0].toUpperCase()}
                {/* RR */}
              </AvatarFallback>
            </Avatar>
            <span className="md:hidden ml-4 font-medium text-md">
              {user?.name}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuLabel>Logged in as {user?.name}!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
              setOpenMobileNav(false);
            }}
            className="focus:bg-primary"
          >
            <MdAccountBalance className="mr-2 w-4 h-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLogoutUser()}
            className="focus:bg-primary"
          >
            <IoMdLogOut className="mr-2 w-4 h-4" />
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
          <HiHomeModern className="w-6 h-6" />
          <span className="font-bold">Shopprixity</span>
        </Link>
        <Sheet open={openMobileNav} onOpenChange={setOpenMobileNav}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden hover:bg-primary"
            >
              <RiMenu3Fill className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetTitle className="hidden"></SheetTitle>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems setOpenMobileNav={setOpenMobileNav} />
            <HeaderRightContent setOpenMobileNav={setOpenMobileNav} />
          </SheetContent>
          <SheetDescription className="hidden"></SheetDescription>
        </Sheet>
        <div className="lg:block hidden">
          <div>
            <MenuItems setOpenMobileNav={setOpenMobileNav} />
          </div>
        </div>
        <div className="lg:block hidden">
          <HeaderRightContent setOpenMobileNav={setOpenMobileNav} />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
