import React, { useEffect, useState } from "react";
import { House, LogOut, Menu, ShoppingCart, UserRound } from "lucide-react";
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
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpenCart(true)}
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <Badge className="top-[-0.6rem] right-[-0.8rem] absolute rounded-full">
            {cartItemsCount}
          </Badge>
          <span className="sr-only">Cart</span>
        </Button>
        <ShopCartWrapper
          cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
          setOpenCart={setOpenCart}
          setOpenMobileNav={setOpenMobileNav}
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
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
              setOpenMobileNav(false);
            }}
          >
            <UserRound className="mr-2 w-4 h-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLogoutUser()}>
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
