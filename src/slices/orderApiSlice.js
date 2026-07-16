import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["order"],
    }),


    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),


    payOrderCod: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/cod`,
        method: "PUT",
  
      }),
    }),


    confirmAdminPayment: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
      }),
    }),


    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),


    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),


    deliverOrder: builder.mutation({
      query: (userId) => ({
        url: `${ORDERS_URL}/${userId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),


    cancelOrder: builder.mutation({
      query: (orderId) => ({
      url: `${ORDERS_URL}/${orderId}/cancel`,
      method: 'PUT',
      }),
    }),

    
    getSummary: builder.query({
      query: () => ({
        url:`${ORDERS_URL}/summary`
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderCodMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useConfirmAdminPaymentMutation,
  useCancelOrderMutation,
  useGetSummaryQuery,
} = ordersApiSlice;
