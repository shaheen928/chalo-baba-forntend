import { apiSlice } from "./apiSlice";


export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url:'/api/banners',
      }),
      providesTags: ['Banners']
    }),
    createBanner: builder.mutation({
     query: (data)=> ({
      url: '/api/banners',
      method: 'POST',
      body: data 
     }),
      invalidatesTags: ['Banners']
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url:`/api/banners/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Banners']
    }),
    upLoadBannerImage: builder.mutation ({
      query: (data) => ({
       url:'/api/upload',
        method: 'POST',
        body: data
      })
    })
  }),
})

export const {useGetBannersQuery,useCreateBannerMutation,useDeleteBannerMutation,useUpLoadBannerImageMutation} = bannerApiSlice;