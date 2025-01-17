import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../components/auth/layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AdminLayout from "../components/admin/layout";
import AdminDashboard from "../pages/admin/dashboard";
import AdminProducts from "../pages/admin/products";
import AdminOrders from "../pages/admin/orders";
import ShoppingLayout from "../components/shopping/layout";
import Error from "../pages/error/error";
import ShoppingHome from "../pages/shopping/home";
import ShoppingListing from "../pages/shopping/listing";
import ShoppingCheckout from "../pages/shopping/checkout";
import ShoppingAccount from "../pages/shopping/account";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
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
        element: <AdminLayout />,
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
        element: <ShoppingLayout />,
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
