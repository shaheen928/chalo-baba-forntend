import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useState } from "react";

const OrderListScreen = () => {
  const [filter, setFilter] = useState("all");
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const filteredOrders = orders?.filter(order => {
    if(filter === 'all') return true;
    if(filter === 'toDeliver') return !order.isDelivered && !order.isCancelled;
    if(filter === 'pending') return !order.isPaid && !order.isCancelled;
  
    if(filter === 'cancelled') return order.isCancelled;
    if(filter === 'PayFast') return order.paymentMethod === 'PayFast';
    if(filter === 'COD') return order.paymentMethod === 'COD';;

    return true
  })
  return (
    <div className="container mx-auto  px-3 sm:px-6 py-4 sm:py-10">
      <h1 className="text-xl sm:text-3xl font-bold mb-5 sm:mb-8 text-slate-800 text-center sm:text-left tracking-tight">
        Admin Orders Panel
      </h1>
      <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-5 sm:mb-6 pb-2 scrollbar-none items-center w-full">
        <button
          onClick={() => setFilter("all")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          All Orders
        </button>

        <button
          onClick={() => setFilter("toDeliver")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "toDeliver" ? "bg-red-400 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          To Deliver (Pending)
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "pending" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600"}`}
        >
         To Collect Cash (Pending)
        </button>

        <button
          onClick={() => setFilter("cancelled")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "cancelled" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setFilter("PayFast")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "PayFast" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          PayFast
        </button>
        <button
          onClick={() => setFilter("COD")}
          className={`min-w-29  h-10 text-xs sm:text-sm text-center px-2 py-1.5 rounded-lg font-medium transtion ${filter === "COD" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          COD
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : (
        <div className="overflow-x-auto w-full bg-white rounded-3xl shadow-lg border border-slate-100">
          <table className="w-full text-left border-collapse  ">
            <thead className="bg-slate-900 text-white uppercase text-sm">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Method</th>
                <th className="p-4">Delivered</th>
                <th className="p-4">Cancelled</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transtion"
                >
                  <td className="p-4 font-medium text-slate-700 whitespace-nowrap">
                    {order.user && order.user.name}{" "}
                  </td>
                  <td className="p-4 whitespace-nowrap">{order.createdAt.substring(0, 10)} </td>
                  <td className="p-4 font-bold text-blue-600 whitespace-nowrap">
                    Rs {order.totalPrice}{" "}
                  </td>
                  <td className="p-4">
                    {order.isPaid ? (
                      <span
                        className="text-green-600 bg-green-50 px-3 py-1
        rounded-full text-xs font-bold"
                      >
                        PAID
                      </span>
                    ) : (
                      <span
                        className="text-red-500 bg-red-50 px-3 py-1
          rounded-full text-xs font-bold"
                      >
                        PENDING
                      </span>
                    )}{" "}
                  </td>
                  <td>
                    {order.paymentMethod === 'PayFast' ? (
                      <span className="text-blue-600 font-bold border border-blue-600 px-2 py-1 rounded-full text-xs ">PayFast</span>
                    ): (
                      <span className="text-orange-600 font-bold border border-orange-600 px-2 py-1 rounded-full text-xs">COD</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {order.isDelivered ? "✓" : "❌"}
                  </td>
                  <td className="p-4 text-center">
                    {order.isCancelled ? (
                      <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-bold">
                        Cancelled
                      </span>
                    ) : (
                      <span className="text-slate-400">Active</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <Link to={`/order/${order._id}`}>
                      <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-white transition-all">
                        <span>Details</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default OrderListScreen;
