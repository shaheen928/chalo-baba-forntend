import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo,redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("wel come");
    } catch (error) {
      toast.error(error?.data?.message || err.error);
    }
  };
  return (<>
    
    <div className="flex justify-center items-center ">
    <CheckoutSteps step1/>
      
      <div className="bg-slate-900 p-5 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">Login</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="text-slate-400 block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 "
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 "
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mt-2">
            <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline hover:text-orange-700 transition-all">Forgot Password ?</Link>
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold 
            py-2.5 sm:py-3.5 rounded-xl transition-all mt-2"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
          <div className="mt-6 text-center text-slate-400">
            Want to create a new account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div></>
  );
};
export default LoginScreen;
