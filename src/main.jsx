import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
// import HomeScreen, { productsLoader } from './screens/HomeScreens.jsx'
import HomeScreen from './screens/HomeScreen';
import './index.css'
import App from './App.jsx'
import ProductScereen, { productLoader } from './screens/ProductScereen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
 import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScereen from './screens/OrderScereen.jsx'
import ProfileScereen from './screens/ProfileScereen.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import ProductListScreen from './screens/admin/ProductListScreen.jsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
import UserEditScreen from './screens/admin/UserEditScreen.jsx'
import DashboardScreen from './screens/admin/DashboardScreen.jsx'
import ForgotPassword from './screens/ForgotPassword.jsx'
import ResetPassword from './screens/ResetPassword.jsx'
import VerifyEmail from './screens/VerifyEmail.jsx'
import AboutScreen from './screens/AboutScreen.jsx'
import ContactScreen from './screens/ContactScreen.jsx'
import ShippingPolicyScreen from './screens/ShippingPolicy.jsx'
import InquiryListScreen from './screens/admin/InquiryListScreen.jsx'
import BannerManageScreen from './screens/admin/BannerManageScreen.jsx'
 

const router =createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children:[
      {
        index:true,
        element: <HomeScreen />,
        loader:productsLoader
      }, {
        path: "/product/:id",
        element: <ProductScereen />,
        loader:productLoader
      },{
        path:"/cart" ,
        element: <CartScreen />
      },{
        path: "/search/:keyword",
        element: <HomeScreen />,
        loader:productsLoader
      }, 
      {
        path: "/page/:pageNumber",
        element: <HomeScreen />,
       },{
        path: "/search/:keyword/page/:pageNumber",
        element: <HomeScreen />,
        loader:productsLoader
      },{
        path: "/login",
        element: <LoginScreen />,
       },{
        path: "/register",
        element: <RegisterScreen />,
       },{
        path: "/forgot-password",
        element: <ForgotPassword />,
       },{
        path: "/reset-password",
        element: <ResetPassword />,
       },{
        path: "/verify-email",
        element: <VerifyEmail />,
       },{
        path: "/about",
        element: <AboutScreen />,
       },{
        path: "/contact",
        element: <ContactScreen />,
       },{
        path: "/shipping-policy",
        element: <ShippingPolicyScreen />,
       },{
        path:"",
        element: <PrivateRoute />,
        children:[
          {
            path: "/shipping",
            element: <ShippingScreen />
          }, {
            path: "/placeorder",
            element: <PlaceOrderScreen />
          },{
            path:"/order/:id",
            element: <OrderScereen />
          },{
            path:"/profile",
            element: <ProfileScereen />
          }
        ]
       },{
        path:'',
        element: <AdminRoute />,
        children:[
          {
            path:'/admin/orderlist',
            element: <OrderListScreen />
          },{
            path: '/admin/productlist',
            element: <ProductListScreen />
          },{
            path: '/admin/product/:id/edit',
            element: <ProductEditScreen />
          },{
            path: '/admin/userlist',
            element: <UserListScreen />
          },{
            path: '/admin/user/:id/edit',
            element: <UserEditScreen />
          },{
            path: '/admin/dashboard/',
            element: <DashboardScreen />
          },{
            path: '/admin/inquirylist',
            element: <InquiryListScreen />
          },{
            path: '/admin/banners',
            element: <BannerManageScreen />
          }
        ]
       }
       
       
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/> 
    </Provider>
  </StrictMode>,
)
