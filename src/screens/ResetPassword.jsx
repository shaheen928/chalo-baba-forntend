 


import { useState } from "react";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaKey, FaLock, FaSpinner } from "react-icons/fa";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    
    try {
      await resetPassword({ otp, password }).unwrap();
      toast.success("Password has been changed successfully.");
      navigate("/login"); 
    } catch (err) {
      toast.error(err?.data?.message || "The code is invalid or has expired.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Set a new password</h2>
          <p className="text-slate-400 text-sm mb-6">
            Enter the OTP received in the email and the new password
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* OTP Code */}
          <div>
            <label className="text-slate-400 block mb-2">OTP Code</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaKey />
              </span>
              <input
                type="text"
                required
                className="pl-10 w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          
          <div>
            <label className="text-slate-400 block mb-2">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                required
                className="pl-10 w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          
          <div>
            <label className="text-slate-400 block mb-2">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                required
                className="pl-10 w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-2 flex justify-center items-center shadow-lg"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;