import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const CheckAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.authReducer
  );

  if (isLoading) return <Skeleton className="w-screen h-screen" />;

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to={"/auth/login"} />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to={"/admin/dashboard"} />;
      } else if (user?.role === "user") {
        return <Navigate to={"/shop/home"} />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    (isAuthenticated && location.pathname.includes("/login")) ||
    location.pathname.includes("/register")
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else if (user?.role === "user") {
      return <Navigate to={"/shop/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user?.role === "user" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/shop/home"} />;
  } else if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;
