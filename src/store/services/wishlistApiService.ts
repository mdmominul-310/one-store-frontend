import baseApi from "../api/baseApi";


const wishlistApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => `/wishlist`,
      providesTags: ["wishlist"],
    }),
    getUserWishlist: builder.query({
      query: ({ id }) => `/wishlist?user=${id}`,
      providesTags: ["wishlist"],
    }),
    getSingleWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
    }),
    addWishlist: builder.mutation({
      query: (wishlist) => ({
        url: `/wishlist`,
        method: "POST",
        body: wishlist,
      }),
      invalidatesTags: ["wishlist"],
    }),

    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetSingleWishlistQuery,
  useGetUserWishlistQuery,
  useGetWishlistQuery,
} = wishlistApiService;
