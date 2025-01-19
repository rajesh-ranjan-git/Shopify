import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    console.log("here 1");

    return <Navigate to={"/auth/login"} />;
  }

  if (
    (isAuthenticated && location.pathname.includes("/login")) ||
    location.pathname.includes("/register")
  ) {
    console.log("here 2");
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else if (user?.role === "user") {
      console.log("here 3");
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
