import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
 import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
         const res = await register({ name, email, password }).unwrap();
        
         
        toast.success(res.message || 'OTP has been sent to your email!');
  
         navigate('/verify-email', { state: { email } });
  
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center  px-4  pt-20 pb-10">
      <div className="bg-slate-900 p-3.5 sm:p-8 rounded-3xl shadow-sm w-full max-w-md border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-semibold  text-white  mb-5 sm:mb-6 text-center tracking-tight">Create a new account</h1>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="text-slate-400 block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              placeholder= "Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-sm">Conform Password</label>
            <input
              type="password"
              className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              placeholder="*****"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg py-2.5 sm:py-3.5 rounded-xl transition-all mt-4 shadow-lg shadow-blue-500/10"
          >
            {isLoading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Account already exists{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;