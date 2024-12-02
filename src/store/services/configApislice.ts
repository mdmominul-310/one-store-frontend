import baseApi from "../api/baseApi";

const configApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => `/config`,
      providesTags: ["Config"],
    }),
  }),
});

export const { useGetConfigQuery } = configApiSlice;
