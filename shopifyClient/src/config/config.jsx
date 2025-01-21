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

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shopHeaderMenuItems = [
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
    // icon: <LayoutDashboard />,
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
    // icon: <LayoutDashboard />,
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
    // icon: <LayoutDashboard />,
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
    // icon: <LayoutDashboard />,
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
    // icon: <LayoutDashboard />,
  },
];
