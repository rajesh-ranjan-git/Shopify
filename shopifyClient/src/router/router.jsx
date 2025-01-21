import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "@/components/auth/layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import AdminLayout from "@/components/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminOrders from "@/pages/admin/orders";
import ShoppingLayout from "@/components/shopping/layout";
import Error from "@/pages/error/error";
import ShoppingHome from "@/pages/shopping/home";
import ShoppingListing from "@/pages/shopping/listing";
import ShoppingCheckout from "@/pages/shopping/checkout";
import ShoppingAccount from "@/pages/shopping/account";
import CheckAuth from "@/components/common/checkAuth";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: (
          // <CheckAuth>
          <AuthLayout />
          // </CheckAuth>
        ),
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/admin",
        element: (
          // <CheckAuth>
          <AdminLayout />
          // </CheckAuth>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
        ],
      },
      {
        path: "/shop",
        element: (
          // <CheckAuth>
          <ShoppingLayout />
          // </CheckAuth>
        ),
        children: [
          {
            path: "home",
            element: <ShoppingHome />,
          },
          {
            path: "listing",
            element: <ShoppingListing />,
          },
          {
            path: "checkout",
            element: <ShoppingCheckout />,
          },
          {
            path: "account",
            element: <ShoppingAccount />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default appRouter;
