import { useState } from "react";
import { useVerifyEmailMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { FaKey, FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();  
  const email = state?.email;
  const dispatch = useDispatch()

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyEmail({ email, otp }).unwrap();
      dispatch(setCredentials({ ...res }));
     toast.success("Account verified successfully!");
      navigate("/");  
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    
    <div className=" flex items-center justify-center bg-gray-50 px-4 pt-16 pb-6">
      <div className="bg-slate-900 p-5 sm:p-8 rounded-3xl shadow-sm w-full max-w-md border border-slate-800">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 text-center">Verify Account</h2>
        <p className="text-slate-400 text-sm mb-6 sm:mb-8 text-center">
          We've sent a code to <span className="text-blue-400">{email}</span>
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="text-slate-400 block mb-2">Enter OTP</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaKey />
              </span>
              <input
                type="text"
                className="pl-10 w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3.5 text-base sm:text-lg rounded-xl transition-all"
          >
            {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Verify Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;