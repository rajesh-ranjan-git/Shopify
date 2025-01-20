import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="lg:flex justify-center items-center hidden bg-black px-12 w-1/2">
        <div className="space-y-6 max-w-md text-center text-primary-foreground">
          <h1 className="font-extrabold text-7xl tracking-tight">
            Welcome to Shopify!
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center bg-background px-4 sm:px-6 lg:px-8 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
