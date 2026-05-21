import { apiSlice } from "./apiSlice";
import { BANNER_URL } from "../constants";
import { UPLOAD_URL } from "../constants";


export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url:BANNER_URL,
      }),
      providesTags: ['Banners']
    }),
    createBanner: builder.mutation({
     query: (data)=> ({
      url: BANNER_URL,
      method: 'POST',
      body: data 
     }),
      invalidatesTags: ['Banners']
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url:`${BANNER_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Banners']
    }),
    upLoadBannerImage: builder.mutation ({
      query: (data) => ({
       url:UPLOAD_URL,
        method: 'POST',
        body: data
      })
    })
  }),
})

export const {useGetBannersQuery,useCreateBannerMutation,useDeleteBannerMutation,useUpLoadBannerImageMutation} = bannerApiSlice;