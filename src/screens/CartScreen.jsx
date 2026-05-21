import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { applyDiscount } from "../slices/cartSlice";

const CartScreen = () => {
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
 
  const {cartItems, discount, itemsPrice, shippingPrice, taxPrice, totalPrice, discountAmount } = cart;
   const addToCartHandler = (product, qty) => {
     dispatch(addToCart({ ...product, qty }));
  };

  
  
 
  const handleCoupon = () => {
    if (coupon === "CHALO10") {
      dispatch(applyDiscount(Number(10)));
    } else {
      alert("Invalid Coupon Code");
    }
  };
const removeFromCartHandler = (id) => {
dispatch(removeFromCart(id))
}
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-4">
      <div className="lg:col-span-2">
        <h1 className="text-[27px] sm:text-3xl font-bold mb-4 sm:mb-8 text-slate-800">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-blue-50 p-6 rounded-2xl text-blue-800 border border-blue-100">
            Your Cart is Empty.{" "}
            <Link className="underline font-bold" to="/">
              Go Back
            </Link>{" "}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-6">
            {cartItems.map((item) => (
              <div
                className="flex items-center gap-3 sm:gap-4 bg-white p-2.5 sm:p-4 rounded-2xl shadow-sm border border-slate-100 transition-hover hover:shadow-md"
                key={item._id}
              >
                {" "}
                   <img
                    className="w-12 h-12 sm:w-18 sm:h-18 bg-gray-50 object-cover rounded-xl"
                    src={item && item.image && typeof item.image === 'String' && item.image.startWith('http') ? item.image : `https://chalo-baba-backend.vercel.app${item.image}`}
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-sm sm:text-lg font-bold text-slate-800 hover:text-blue-600 line-clamp-1"
                    >
                      {item.name}{" "}
                    </Link>
                    <p className="text-blue-600 font-bold text-sm sm:text-base mt-1"> RS {item.price} </p>
                  </div>
                 <div className="flex items-center gap-3 sm:gap-6">
                  <select
                    value={item.qty}
                    onChange={(e) => {
                      addToCartHandler(item, Number(e.target.value));
                    }}
                    className="border rounded p-1 bg-gray-50 focus:outline-none text-xs sm:text-sm"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}{" "}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => {
                    removeFromCartHandler(item._id)
                  }} className="text-red-500 hover:text-red-700 transition-colors">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
      </div>

      <div className="bg-slate-900 p-5 sm:p-8 mt-2 lg:mt-15 shadow-2xl rounded-3xl border border-slate-800 h-fit sticky top-4">
        <h2 className="text-2xl  font-bold mb-3 sm:mb-6 border-b border-slate-700 pb-3 sm:pb-4 text-white">
          Order Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between text-slate-400">
            <span className="font-bold">Subtotal:</span>
            <span className="text-white">Rs {itemsPrice} </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-400  ">
              <span className="font-bold">Discount{discount}%: </span>
              <span>-Rs{discountAmount} </span>{" "}
            </div>
          )}
           <div className="flex justify-between  text-slate-400">
            <span className="font-bold">Shipping:</span>
            <span className={shippingPrice === "0.00" ? "text-green-400 font-bold" : "text-white"}>  {shippingPrice === "0.00" ? 'FREE' : `Rs ${shippingPrice}`} </span>
          </div>
          <div className="flex justify-between text-slate-400 ">
            <span className="font-bold">GST (5%) </span>
            <span className="text-white">Rs{taxPrice} </span>
          </div>
          <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between text-xl sm:text-2xl font-black text-white">
            <span>Total:</span>
            <span className="text-blue-500">{totalPrice} </span>
          </div>
        </div>
        <div className="mt-4 ">
          
          <div className="flex gap-2">
            <input
              type="text"
               className=" bg-slate-800 border border-slate-700 p-2.5 rounded-xl w-full text-white
               text-sm sm:text-base   focus:border-blue-500 outline-none"
               placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value.toLocaleUpperCase());
              }}
            />
            <button
              onClick={handleCoupon}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        <button
          className=" w-full bg-blue-600 text-white py-3 sm:py-4 rounded-2xl  font-bold mt-4 sm:mt-6  hover:bg-blue-700 shadow-lg shadow-blue-900/40 transition-all disabled:bg-slate-700"
          disabled={cartItems.length === 0}
          onClick={() => {
            navigate("/login?redirect=/shipping");
          }}
        >
          {" "}
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};
export default CartScreen;
