import baseApi from "../api/baseApi";

export const addressApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => `/address`,
      providesTags: ["Address"],
    }),
    getSingleAddress: builder.query({
      query: (id) => `/address/${id}`,
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation({
      query: (address) => ({
        url: `/address`,
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: `/address/${address._id}`,
        method: "PATCH",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useGetSingleAddressQuery,
  useUpdateAddressMutation,
} = addressApiService;
