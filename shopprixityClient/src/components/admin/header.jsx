import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import logoutUserService from "@/services/auth/logoutUserService";

const AdminHeader = ({ openSidebar, setOpenSidebar }) => {
  const [headerTitle, setHeaderTitle] = useState("Admin Panel");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutUser = () => {
    dispatch(logoutUserService()).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message || "Something went wrong!",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setHeaderTitle("Dashboard");
    } else if (location.pathname.includes("products")) {
      setHeaderTitle("Products");
    } else if (location.pathname.includes("orders")) {
      setHeaderTitle("Orders");
    } else {
      setHeaderTitle("Admin Panel");
    }
  }, [location]);

  return (
    <header className="z-40 fixed flex justify-between items-center bg-background px-4 py-3 border-b w-full">
      <Button
        variant="outline"
        className="sm:block lg:hidden hover:bg-primary"
        onClick={() => setOpenSidebar(true)}
      >
        <RiMenu2Fill />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="w-full">
        <h2 className="font-extrabold text-2xl text-center">{headerTitle}</h2>
      </div>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2 shadow px-4 py-2 rounded-md font-medium text-sm"
          onClick={() => handleLogoutUser()}
        >
          <IoMdLogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
