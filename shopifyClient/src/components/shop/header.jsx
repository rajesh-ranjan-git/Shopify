import React from "react";
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
import { Avatar, AvatarFallback } from "../ui/avatar";
import logoutUserService from "@/services/auth/logoutUserService";

const MenuItems = () => {
  return (
    <nav className="flex lg:flex-row flex-col lg:items-center gap-6 mb-3 lg:mb-0">
      {shopHeaderMenuItems.map((menuItem) => (
        <Link
          className="font-medium text-sm"
          key={menuItem.id}
          to="/shop/listing"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  // const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserService());
  };

  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black font-extrabold text-white">
              {/* {user?.name[0].toUpperCase()} */}
              RR
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {/* {user?.name */}
          </DropdownMenuLabel>
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
  return (
    <header className="top-0 z-40 sticky bg-background border-b w-full">
      <div className="flex justify-between items-center px-4 md:px-6 h-16">
        <Link className="flex items-center gap-2" to="/shop/home">
          <House className="w-6 h-6" />
          <span className="font-bold">Shopify</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="lg:block hidden">
          <div>
            <MenuItems />
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
