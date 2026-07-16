// import { apiSlice } from "./apiSlice";
// import { PRODUCTS_URL } from "../constants";
// import { UPLOAD_URL } from "../constants";

// const productApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getAdminProduct: builder.query({
//       query: () => ({
//         url: `${PRODUCTS_URL}/admin`,
//       }),
//       providesTags: ["Product"],
//     }),
//     productDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//     }),
//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: "POST",
//       }),
//       invalidatesTags: ["Product"],
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: UPLOAD_URL,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["Product"],
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Product"],
//     }),
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Product"],
//     }),
//   }),
// });

// export const {
//   useGetAdminProductQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useProductDetailsQuery,
//   useUploadProductImageMutation,
//   useCreateReviewMutation,
//   useDeleteProductMutation,
// } = productApiSlice;


import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";
import { UPLOAD_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getAdminProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/admin`,
      }),
      providesTags: ["Product"],
    }),
    productDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,  
  useGetAdminProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useProductDetailsQuery,
  useUploadProductImageMutation,
  useCreateReviewMutation,
  useDeleteProductMutation,
} = productApiSlice;