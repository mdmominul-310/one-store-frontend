import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import ProductViewLayout from "@/layouts/ProductViewLayout";
import ProductCategory from "@/pages/product-category";
import Cart from "@/pages/cart";
import CheckoutPage from "@/pages/checkout-page";
import OrderSuccessPage from "@/pages/order-success-page";
import Home from "@/pages/home";

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
    ],
  },
]);
