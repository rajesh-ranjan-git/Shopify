import React from "react";
import { adminSidebarMenuItems } from "@/config/config";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ setOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.length &&
        adminSidebarMenuItems.map((menuitem) => (
          <div
            className="flex items-center gap-2 hover:bg-muted px-3 py-2 rounded-md text-muted-foreground text-xl hover:text-foreground cursor-pointer"
            key={menuitem.id}
            onClick={() => {
              navigate(menuitem.path);
              setOpenSidebar ? setOpenSidebar(false) : null;
            }}
          >
            {menuitem.icon}
            <span>{menuitem.label}</span>
          </div>
        ))}
    </nav>
  );
};

export default MenuItems;
