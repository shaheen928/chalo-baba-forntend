import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress, savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );
  const [country, setCountry] = useState(
    shippingAddress?.country || "Pakistan",
  );
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress?.phoneNumber || "",
  );
  const [paymentMethod, setPaymentMethod] = useState(
    cart?.paymentMethod || "PayFast",
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phoneNumber }),
    );
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      

      <div className="max-w-2xl mx-auto mt-2 px-4 mb-6">
      <CheckoutSteps step1 step2 />
        <form
          onSubmit={submitHandler}
          className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-5 md:p-8 space-y-5"
        >
          <div className="space-y-3.5 p-1 sm:p-3">
            <h2 className="text-2xl sm:text-[27px] font-bold text-white mb-0.5 border-b border-slate-800 pb-2">
              Shipping Address
            </h2>

            <div>
              <label className="text-slate-400 block mb-1 text-base sm:text-sm">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 rounded-xl bg-slate-800 text-white text-sm sm:text-base border border-slate-700 outline-none focus:border-blue-500 transition-all"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1 text-sm">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 rounded-xl bg-slate-800 text-white text-sm sm:text-base border border-slate-700 outline-none focus:border-blue-500 transition-all"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 text-sm">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Postal code"
                  className="w-full p-3 rounded-xl bg-slate-800 text-white text-sm sm:text-base border border-slate-700 outline-none focus:border-blue-500 transition-all"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1 text-sm">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Pakistan"
                  className="w-full p-3 rounded-xl bg-slate-800 text-white text-sm sm:text-base border border-slate-700 outline-none focus:border-blue-500 transition-all"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 text-sm">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="03*********"
                  className="w-full p-3 rounded-xl bg-slate-800 text-white text-sm sm:text-base  border border-slate-700 outline-none focus:border-blue-500 transition-all"
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-0.5 sm:pt-2 border-t border-slate-800">
            <h3 className="text-md font-semibold text-slate-400">
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                onClick={() => setPaymentMethod("PayFast")}
                className={`flex items-center gap-3 p-3 bg-slate-800 rounded-xl cursor-pointer border transition-all ${
                  paymentMethod === "PayFast"
                    ? "border-blue-500 bg-slate-800/60"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  id="PayFast"
                  name="paymentMethod"
                  value="PayFast"
                  checked={paymentMethod === "PayFast"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4   accent-blue-500"
                />
                <label
                  htmlFor="PayFast"
                  className="text-white cursor-pointer flex-1 flex justify-between items-center text-sm"
                >
                  <span className="text-sm sm:text-base">PayFast</span>
                  <img
                    src="/payfast-logo.png"
                    alt="PayFast"
                    className="w-7 sm:w-8 h-auto object-contain"
                  />
                </label>
              </div>

              <div
                onClick={() => setPaymentMethod("COD")}
                className={`flex items-center gap-3 p-3 bg-slate-800 rounded-xl cursor-pointer border transition-all ${
                  paymentMethod === "COD"
                    ? "border-blue-500 bg-slate-800/60"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-blue-500"
                />
                <label
                  htmlFor="COD"
                  className="text-white cursor-pointer flex-1 flex justify-between items-center text-sm"
                >
                  <span  className="text-sm sm:text-base">Cash on Delivery</span>
                  <img
                    src="/car-box.jpg"
                    alt="COD"
                    className="w-7 sm:w-8 h-auto object-contain"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-1 sm:pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4  rounded-xl font-bold text-sm sm:text-base hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-600/10"
            >
              Review the Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
