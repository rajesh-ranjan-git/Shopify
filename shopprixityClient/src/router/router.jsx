import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "@/components/auth/layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import AdminLayout from "@/components/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminOrders from "@/pages/admin/orders";
import ShopLayout from "@/components/Shop/layout";
import Error from "@/pages/error/error";
import ShopHome from "@/pages/shop/home";
import ShopListing from "@/pages/shop/listing";
import ShopCheckout from "@/pages/shop/checkout";
import ShopAccount from "@/pages/shop/account";
import CheckAuth from "@/components/common/checkAuth";
import PaypalReturnPage from "@/pages/shop/paypalReturnPage";
import PaymentSuccess from "@/pages/shop/paymentSuccess";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: (
          <CheckAuth>
            <AuthLayout />
          </CheckAuth>
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
          <CheckAuth>
            <AdminLayout />
          </CheckAuth>
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
          <CheckAuth>
            <ShopLayout />
          </CheckAuth>
        ),
        children: [
          {
            path: "home",
            element: <ShopHome />,
          },
          {
            path: "listing",
            element: <ShopListing />,
          },
          {
            path: "checkout",
            element: <ShopCheckout />,
          },
          {
            path: "account",
            element: <ShopAccount />,
          },
          {
            path: "paypalReturnPage",
            element: <PaypalReturnPage />,
          },
          {
            path: "paymentSuccess",
            element: <PaymentSuccess />,
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
