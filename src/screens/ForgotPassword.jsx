import { useState } from "react";
import { useForgotPasswordMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
 


const ForgotPassword = () => {
  const [email,setEmail] = useState();
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await  forgotPassword({email}).unwrap();
      toast.success (res.message || 'OTP has been emailed');
      navigate('/reset-password')
    } catch (err) {
      toast.error(err?.data?.message || 'There was problem sending email')
    }
  }
  return (
    <div className="min-h-[80vh] flex items-center justify-center  px-4 py-12 ">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl shadow-md p-8 border border-slate-800">
        <div className="text-center mb-8 ">
          <h2 className="text-3xl font-bold text-white mb-6">Forgot Password ?</h2>
          <p className="mb-6 text-sm text-slate-400">Enter your registered email address and we will send you a six-digit verification code OTP.</p>
        </div>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-slate-400 mb-2">Email Address</label>


            <input type="email" id="email" required className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
             placeholder="example@gmail.com"
             value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-2">
              {isLoading ? (<span className="flex items-center justify-center"><FaSpinner className="animate-spin mr-2"/></span>):(
                "Send OTP"
              )}
             </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-orange-600 hover:to-orange-500">
          Go back to login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword; 