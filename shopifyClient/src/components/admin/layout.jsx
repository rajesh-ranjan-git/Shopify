import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      {/* Admin Sidebar */}
      <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex flex-col flex-1">
        {/* Admin Header */}
        <AdminHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
