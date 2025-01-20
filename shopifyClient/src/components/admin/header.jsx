import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";

const AdminHeader = ({ openSidebar, setOpenSidebar }) => {
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
        <Button className="inline-flex items-center gap-2 shadow px-4 py-2 rounded-md font-medium text-sm">
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
