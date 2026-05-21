import react from "react";
import { useGetSummaryQuery } from "../../slices/orderApiSlice";
import { useGetContactMessageQuery } from "../../slices/contactApiSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: errorSummary,
  } = useGetSummaryQuery();

  const {
    data: inquiries,
    isLoading: isLoadingInquiries,
    error: errorInquiries,
  } = useGetContactMessageQuery();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-xl sm:text-3xl font-bold mb-5 sm:mb-8 text-slate-800 text-center sm:text-left tracking-tight">
        Admin Dashboard
      </h1>
      {isLoadingSummary ? (
        <Loader />
      ) : errorSummary ? (
        <Message variant="danger">{error.data.message} </Message>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600 transition-all">
              <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide ">
                Total Sales
              </p>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1 ">
                Rs.{summary.totalSales.toLocaleString()}{" "}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
              <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide  ">
                Orders
              </p>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1 ">
                {summary.orderCount}{" "}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-600">
              <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide ">
                Users
              </p>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1 ">
                {summary.userCount}{" "}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-600">
              <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide ">
                Products
              </p>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1 ">
                {summary.productCount}{" "}
              </h3>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 ">
              Sales Revenue (Daily)
            </h2>
            <div className="w-full overflow-x-auto pb-2">
              <div className=" h-72 sm:h-100 min-w-162.5 sm:w-full ">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={summary.salesByDate}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-8 sm:mt-10 bg-white px-4  sm:px-6 rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-xl font-semibold p-2">Recent Orders</h2>
          <button
            onClick={() => navigate("/admin/orderlist")}
            className="text-blue-600 hover:underline text-sm font-medium px-4"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-163">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {summary?.recentOrders?.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {order._id.substring(0, 10)}...{" "}
                  </td>
                  <td className="px-4 py-3">
                    {order.user ? order.user.name : "Guest"}{" "}
                  </td>
                  <td className="px-4 py-3">
                    {order.createdAt?.substring(0, 10)}{" "}
                  </td>
                  <td className="px-4 py-3">{order.totalPrice} </td>
                  <td className="px-4 py-3">
                    {order.isDelivered ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        Delivered
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 bg-white px-4 sm:px-6 py-4 rounded-xl shadow-md overflow-hidden ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Resent Messages (inquiries)</h2>
          <button
            onClick={() => navigate("/admin/inquirylist")}
            className="text-blue-600 hover:underline text-sm font-medium px-4 whitespace-nowrap"
          >
            View All
          </button>
        </div>
        {isLoadingInquiries ? (
          <Loader />
        ) : errorInquiries ? (
          <Message variant="danger">Could not load messages</Message>
        ) : (
          <div className="overflow-x-auto w-full ">
            <table className="w-full text-left min-w-150 ">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries?.slice(0, 5).map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-slate-50 transition text-sm text-slate-700"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                      {inquiry.createdAt?.substring(0, 10)}
                    </td>
                    <td className="px4-py-3 text-blue-600 whitespace-nowrap">
                      {inquiry.name}{" "}
                    </td>
                    <td className="px-4 py-3 text-blue-600 whitespace-nowrap">
                      <a href={`mailto:${inquiry.email}`}>{inquiry.email} </a>
                    </td>
                    <td
                      className="px-4 py-3 max-w-75 truncate "
                      title={inquiry.message}
                    >
                      {inquiry.message}{" "}
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-slate-400 text-sm"
                    >
                      No message found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardScreen;
