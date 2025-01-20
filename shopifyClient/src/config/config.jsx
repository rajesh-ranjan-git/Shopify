import { LayoutDashboard, PackageOpen, ShoppingBag } from "lucide-react";

export const registerFormControls = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name...",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "password",
    type: "password",
  },
  {
    name: "password_confirmation",
    label: "Confirm Password",
    placeholder: "Enter your password again...",
    componentType: "password",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "password",
    type: "password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <PackageOpen />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBag />,
  },
];
