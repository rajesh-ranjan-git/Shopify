import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../components/auth/layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

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
    ],
  },
]);

export default appRouter;
