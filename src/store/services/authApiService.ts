import { authApi } from "../api/baseApi";

const authApiService = authApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/user/create`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = authApiService;
