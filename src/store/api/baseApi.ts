// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URI, credentials: "include" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),

  reducerPath: "baseApi",
  // Tag types are used for caching and invalidation.
  tagTypes: [
    "User",
    "Category",
    "color",
    "size",
    "product",
    "order",
    "banner",
    "cart",
    "Promotion",
    "Menu",
    "user",
    "Config",
    "wishlist",
    "Address"
  ],
  endpoints: () => ({}),
});


export default baseApi;
