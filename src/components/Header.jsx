import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { logout } from "../slices/authSlice";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { FaImages } from 'react-icons/fa';

const Header = () => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 text-white shadow-lg">
        <nav className="  w-full mx-auto px-4 py-3 flex flex-wrap md:flex-row items-center justify-between gap-3 md:gap-5">
          <Link
            to="/"
            className="flex items-center transition-transform active:scale-95 duration-200 "
          >
            <img src="/logo.png" alt="Chalo Baba" 
            className="h-12 w-auto pl-2 object-cover"/>
          </Link>

          <div className="w-full order-3 md:order-2 md:flex-1 md:max-w-md lg:mx-w-xl ">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 order-2 md:order-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <FaShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {totalQty > 0 && (
                <sup className="absolute -top-2 -right-3">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalQty}
                  </span>
                </sup>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                {userInfo.isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                      className="flex items-center gap-1 sm:gap-2 hover:text-blue-400 text-white px-2 sm:px-4 py-2 rounded-xl transition-all font-medium"
                    >
                      <GrUserAdmin />
                      <span className="hidden sm:inline">Admin</span>
                      <FaChevronDown
                        className={`text-xs transition-transform duration-300 ${adminMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {adminMenuOpen && (
                      <div className="absolute right-0 mt-2 w-44 sm:w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-60 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setAdminMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-50"
                        >
                          <FaChartLine className="text-purple-500" />
                          <span className="font-semibold">Dashboard</span>
                        </Link>

                        <Link
                          to="/admin/orderlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <FaTasks className="text-blue-500" />
                          <span>Manage Orders</span>
                        </Link>
                        <Link
                          to="/admin/productlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <FaBoxesStacked className="text-orange-500" />
                          <span>Manage Products</span>
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <FaUsers className="text-green-500" />
                          <span>Manage Users</span>
                        </Link>
                        <Link
    to="/admin/banners"
    onClick={() => setAdminMenuOpen(false)}
    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-slate-50"
  >
    <FaImages className="text-blue-500" />
    <span>Manage Banners</span>
  </Link>
                        
                      </div>
                    )}
                  </div>
                )}

                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-1 text-white hover:text-blue-400 font-medium py-2 px-1"
                  >
                    <FaUser />
                    <span className="hidden sm:inline">{userInfo.name}</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 w-36 sm:w-48 mt-2 py-2 bg-white rounded-2xl shadow-xl border border-slate-100  z-50 animate-in fade-in slide-in-from-top-1">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-white hover:text-blue-400 font-medium"
                >
                  <FaUser />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="bg-slate-800 text-sm text-slate-300 border-t border-slate-700 hidden md:block">
          <div className="container mx-auto px-4 py-2 flex justify-around gap-10">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              to="/search/electronics"
              className="hover:text-white transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/search/mobiles"
              className="hover:text-white transition-colors"
            >
              Mobiles
            </Link>
            <Link
              to="/search/laptops"
              className="hover:text-white transition-colors"
            >
              Laptops
            </Link>
            <Link
              to="/search/cameras"
              className="hover:text-white transition-colors"
            >
              Cameras
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
