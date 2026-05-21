import{configureStore} from '@reduxjs/toolkit'
import {apiSlice} from './slices/apiSlice.js'
import cartSliceReducer from './slices/cartSlice.js'
import authSliceReduser from './slices/authSlice.js'


const store= configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReduser
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware()
  .concat(apiSlice.middleware),
  devTools:true,
}) 

export default store;