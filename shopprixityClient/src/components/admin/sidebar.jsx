import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import MenuItems from "./menuItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const AdminSidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <MdAdminPanelSettings size={35} />
                <span className="font-extrabold text-2xl">Admin Panel</span>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <MenuItems setOpenSidebar={setOpenSidebar} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="lg:flex flex-col hidden bg-background p-6 border-r w-64">
        <div
          className="flex gap-2 item-center cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <MdAdminPanelSettings size={35} />
          <span className="font-extrabold text-xl md:text-2xl">
            Admin Panel
          </span>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
