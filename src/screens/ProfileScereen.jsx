import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";

const ProfileScereen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      toast.error("password do not match");
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile update sucessfuly");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 container mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <div className="w-full lg:w-1/3 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">My Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Update Profile
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      <div className="w-full lg:w-2/3 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 h-fit mt-4 lg:mt-0 ">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div
            className="overflow-x-auto bg-white
        rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 w-full"
          >
            <table className="w-full text-left border-collapse min-w-163 ">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-xs">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Total</th>
                  <th className="p-4 font-bold">Paid</th>
                  <th className="p-4 font-bold">Delivered</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-slate-50 hover:bg-slate-50 transition"
                  >
                    <td className="p-4 whitespace-nowrap">{order._id.substring(0, 10)} </td>

                    <td className="p-4 whitespace-nowrap">{order.createdAt.substring(0, 10)} </td>

                    <td className="p-4 whitespace-nowrap font-bold">{order.totalPrice} </td>
                    <td className="p-4 whitespace-nowrap">
                      {order.isPaid ? (
                        <div className="flex flex-col">
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
                            PAID
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1">
                            {order.paidAt?.substring(0, 10)}
                          </span>{" "}
                        </div>
                      ) : (
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit  ">
                          UNPAID
                        </span>
                      )}{" "}
                    </td>
                    <td className="p-4 text-center">
                      {order.isDelivered ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-slate-300 text-lg">−</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm hover:bg-blue-100 transition "
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileScereen;
