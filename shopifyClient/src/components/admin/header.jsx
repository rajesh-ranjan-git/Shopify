import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import logoutUserService from "@/services/auth/logoutUserService";

const AdminHeader = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutUserService()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Logged out successfully!",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Error while logging out!",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <header className="flex justify-between items-center bg-background px-4 py-3 border-b">
      <Button
        className="sm:block lg:hidden"
        onClick={() => setOpenSidebar(true)}
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2 shadow px-4 py-2 rounded-md font-medium text-sm"
          onClick={() => handleLogoutUser()}
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
