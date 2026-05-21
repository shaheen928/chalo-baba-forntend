import { apiSlice } from "./apiSlice";
import {USERS_URL} from "../constants.js"
 
 
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
     ProvidesTags: ['User'],    }),
      updateProfile: builder.mutation({
        query: (data) => ({
          url:`${USERS_URL}/profile`,
          method: 'PUT',
          body:data
        }),
        ProvidesTags: ['User'],
      }),
      getUsers: builder.query({
        query: () => ({
          url: USERS_URL
        }),
        providesTags: ['User']
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['User'],
      }),
      getUserDetails: builder.query({
        query: (id) => ({
        url:`${USERS_URL}/${id}`
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/${data.userId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['User']
      }),
      forgotPassword: builder.mutation ({
        query : (data) => ({
          url: `${USERS_URL}/forgotpassword`,
          method: 'POST',
          body: data
        })
      }),
      resetPassword : builder.mutation ({
        query: (data) => ({
          url: `${USERS_URL}/resetpassword`,
          method: 'PUT',
          body: data
        })
      }),
      verifyEmail: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/verify-email`, 
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useGetProfileQuery,useUpdateProfileMutation,
  useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation,useForgotPasswordMutation,useResetPasswordMutation,useVerifyEmailMutation
 } = userApiSlice;
