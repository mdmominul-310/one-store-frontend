import baseApi from "../api/baseApi";


const order = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["order"],
    }),
    getUserOrders: builder.query({
      query: ({id}) => `/orders?user=${id}`,
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: "PATCH",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = order;
