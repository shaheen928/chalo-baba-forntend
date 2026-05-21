import { apiSlice } from "./apiSlice";
  
 
export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContactMessage: builder.mutation({
      query: (data) => ({
        url: '/api/contact',
        method: 'POST',
        body: data,
      }),
    }), 
    getContactMessage: builder.query({
      query: () => ({
        url: '/api/contact',
        method: 'GET'
      }),
      providesTags: ['Inquiries'],
    }),
    deleteInquiry: builder.mutation ({
      query: (id) => ({
        url: `/api/contact/${id}`,
        method: 'DELETE',       
      }),
     invalidatesTags: ['Inquiries'],
    })
  }),
});

export const {useCreateContactMessageMutation,useGetContactMessageQuery,useDeleteInquiryMutation
 } = contactApiSlice;
