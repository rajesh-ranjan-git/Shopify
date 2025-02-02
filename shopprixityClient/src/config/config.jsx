import {
  Baby,
  Cat,
  Footprints,
  LayoutDashboard,
  PackageOpen,
  Watch,
  Shirt,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaShopify } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";

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

export const categories = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: Cat },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

export const brands = [
  { id: "nike", label: "Nike", icon: Zap },
  { id: "adidas", label: "Adidas", icon: Zap },
  { id: "puma", label: "Puma", icon: Zap },
  { id: "levi", label: "Levi's", icon: Zap },
  { id: "zara", label: "Zara", icon: Zap },
  { id: "h&m", label: "H&M", icon: Zap },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <RiDashboard2Fill size={25} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <FaShopify size={25} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <HiMiniShoppingBag size={25} />,
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
    placeholder: "Choose category",
    options: categories,
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    placeholder: "Choose brand",
    options: brands,
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
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const sortOptions = [
  {
    id: "price-lowtohigh",
    label: "Price: Low to High",
  },
  {
    id: "price-hightolow",
    label: "Price: High to Low",
  },
  {
    id: "title-atoz",
    label: "Title: A to Z",
  },
  {
    id: "title-ztoa",
    label: "Title: Z to A",
  },
];

export const filterOptions = {
  category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
    {
      id: "footwear",
      label: "Footwear",
    },
  ],
  brand: [
    {
      id: "nike",
      label: "Nike",
    },
    {
      id: "adidas",
      label: "Adidas",
    },
    {
      id: "puma",
      label: "Puma",
    },
    {
      id: "levi",
      label: "Levi",
    },
    {
      id: "zara",
      label: "Zara",
    },
    {
      id: "h&m",
      label: "H&M",
    },
  ],
};

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter your additional notes",
  },
];
