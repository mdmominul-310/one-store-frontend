import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import ProductViewLayout from "@/layouts/ProductViewLayout";
import ProductCategory from "@/pages/product-category";
import Cart from "@/pages/cart";
import CheckoutPage from "@/pages/checkout-page";
import OrderSuccessPage from "@/pages/order-success-page";
import Home from "@/pages/home";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Orders from "@/pages/orders";
import Wishlist from "@/pages/wishlist";
import PaymentMethods from "@/pages/payment-methods";
import Address from "@/pages/addresses";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import Register from "@/pages/register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <ProductCategory />,
      },
      {
        path: "/products/:slug",
        element: <ProductViewLayout />,
      },
      {
        path: "/categories/:slug",
        element: <ProductCategory />,
      },
      {
        path: "/all-products",
        element: <ProductCategory />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Orders />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/dashboard/address",
        element: (
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-methods",
        element: (
          <PrivateRoute>
            <PaymentMethods />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
