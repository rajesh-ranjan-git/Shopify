import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="lg:flex justify-center items-center hidden bg-primary px-12 w-1/2">
        <div className="flex flex-col justify-center items-center space-y-6 max-w-md text-center text-primary-foreground">
          <img src="/shopprixity.svg" className="w-40 h-40" />
          <h1 className="font-extrabold text-7xl tracking-tight">
            Shopprixity!
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
