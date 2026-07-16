// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { useCreateOrderMutation } from "../slices/orderApiSlice";
// import { clearCartItems } from "../slices/cartSlice";
// import { toast } from "react-toastify";

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     } else if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();
//   const placeOrderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//         discount: cart.discount,
//         discountAmount: cart.discountAmount,
//       }).unwrap();
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (error) {
//       toast.error(error)
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <CheckoutSteps step1 step2 step3 />
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//             <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 ">
//               Shipping Details
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg mb-2 ">
//               <strong className="text-slate-800">Address:</strong>
//               {cart.shippingAddress.address},{cart.shippingAddress.city},
//               {cart.shippingAddress.country},{cart.shippingAddress.postalCode}
//             </p>
//             <p className="text-slate-600 text-base sm:text-lg">
//               <strong className="text-slate-800">Phone Number:</strong>
//               {cart.shippingAddress.phoneNumber}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//             <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 border-b pb-2">
//               Payment Method
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg">
//               <strong className="text-slate-800">Selected:</strong>
//               {cart.paymentMethod}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//             <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 border-b pb-2">
//               Order Items
//             </h2>
//             {cart.cartItems.length === 0 ? (
//               <p>Your cart is empty</p>
//             ) : (
//               <div className="space-y-3">
//                 {cart.cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-baseline border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
//                     <div className="flex items-center gap-3 sm:gap-4 min-w-0">
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
//                       <img
//                         src={item?.image}
//                         alt={item.name}
//                         className="h-full w-full object-cover"
//                       />
//                       </div>
//                       <div className="flex flex-col gap-0.5 min-w-0">
//                         <Link
//                           to={`/product/${item._id}`}
//                           className="text-blue-600 hover:underline font-bold text-sm  truncate max-w-30 sm:max-w-none "
//                         >
//                           {item.name}
//                         </Link>

//                         <span className="text-sm text-slate-400 font-medium sm:hidden">
//                           {item.qty} x Rs {item.price} =
//                         </span>
//                       </div>
//                     </div>
//                     <div className="text-sm  text-slate-700 text-right shrink-0 pl-2 self-end pb-0.5">
//                       <span className="hidden sm:inline text-slate-500 text-xs font-medium mr-1">
//                         {item.qty} x Rs{item.price} =
//                       </span>
//                       <strong className="font-black text-slate-800">
//                         Rs {(item.qty * item.price).toFixed(2)}
//                       </strong>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl h-fit border border-slate-800 text-white">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-4  text-center">
//             Oder Summary
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between text-slate-400 ">
//               <span>Price of Items</span>
//               <span className="text-white font-semibold">
//                 Rs {cart.itemsPrice}{" "}
//               </span>
//             </div>
//             {cart.discount > 0 && (
//               <div className="flex justify-between text-green-400">
//                 <span>Discount:({cart.discount}%)</span>
//                 <span className="font-semibold  ">
//                   - Rs{cart.discountAmount}{" "}
//                 </span>
//               </div>
//             )}
//             <div className="flex justify-between text-slate-400">
//               <span>Delivery Charges</span>
//               <span
//                 className={
//                   cart.shippingPrice === "0.00"
//                     ? "text-green-400 font-bold"
//                     : "text-white font-semibold"
//                 }
//               >
//                 {cart.shippingPrice === "0.00"
//                   ? "FREE"
//                   : `Rs ${cart.shippingPrice}`}{" "}
//               </span>
//             </div>
//             <div className="flex justify-between text-slate-400">
//               <span>Tax(Gst): </span>{" "}
//               <span className="text-white font-semibold">
//                 Rs {cart.taxPrice}{" "}
//               </span>
//             </div>
//             <div className="border-t border-slate-700 pt-4 mt-4 flex justify-between text-lg sm:text-xl font-black">
//               <span>Total Bill:</span>
//               <span className="text-blue-500 underline">
//                 Rs{cart.totalPrice}{" "}
//               </span>
//             </div>
//           </div>
//           <button
//             type="button"
//             className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold sm:text-lg mt-5 sm:mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:bg-slate-700"
//             disabled={cart.cartItems.length === 0}
//             onClick={placeOrderHandler}
//           >
//             Confirm Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PlaceOrderScreen;

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // isLoading کو یہاں سے حاصل کریں
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        discount: cart.discount,
        discountAmount: cart.discountAmount,
      }).unwrap();
      
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      // موبائل کریش سے بچنے کے لیے ایرر آبجیکٹ کو محفوظ طریقے سے ہینڈل کریں
      toast.error(err?.data?.message || err?.error || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps step1 step2 step3 />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
              Shipping Details
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-2">
              <strong className="text-slate-800">Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.country}, {cart.shippingAddress.postalCode}
            </p>
            <p className="text-slate-600 text-base sm:text-lg">
              <strong className="text-slate-800">Phone Number:</strong>
              {cart.shippingAddress.phoneNumber}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              Payment Method
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              <strong className="text-slate-800">Selected:</strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              Order Items
            </h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-baseline border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                        <img
                          src={item?.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-blue-600 hover:underline font-bold text-sm truncate max-w-30 sm:max-w-none"
                        >
                          {item.name}
                        </Link>
                        <span className="text-sm text-slate-400 font-medium sm:hidden">
                          {item.qty} x Rs {item.price} =
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-700 text-right shrink-0 pl-2 self-end pb-0.5">
                      <span className="hidden sm:inline text-slate-500 text-xs font-medium mr-1">
                        {item.qty} x Rs{item.price} =
                      </span>
                      <strong className="font-black text-slate-800">
                        Rs {(item.qty * item.price).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Side Card */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl h-fit border border-slate-800 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-4 text-center">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-slate-400">
              <span>Price of Items</span>
              <span className="text-white font-semibold">
                Rs {cart.itemsPrice}
              </span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount:({cart.discount}%)</span>
                <span className="font-semibold">- Rs {cart.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Delivery Charges</span>
              <span
                className={
                  cart.shippingPrice === "0.00"
                    ? "text-green-400 font-bold"
                    : "text-white font-semibold"
                }
              >
                {cart.shippingPrice === "0.00"
                  ? "FREE"
                  : `Rs ${cart.shippingPrice}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax(Gst): </span>{" "}
              <span className="text-white font-semibold">
                Rs {cart.taxPrice}
              </span>
            </div>
            <div className="border-t border-slate-700 pt-4 mt-4 flex justify-between text-lg sm:text-xl font-black">
              <span>Total Bill:</span>
              <span className="text-blue-500 underline">
                Rs {cart.totalPrice}
              </span>
            </div>
          </div>

          {/* Touch UI کے لیے بہتر بنایا گیا بٹن */}
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold sm:text-lg mt-5 sm:mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed select-none touch-manipulation relative z-10"
            disabled={cart.cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
          >
            {isLoading ? "Processing Order..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;