import { useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderCodMutation,
  useDeliverOrderMutation,
  useConfirmAdminPaymentMutation,
  useCancelOrderMutation,
} from "../slices/orderApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const OrderScereen = () => {
  const [loadingCod, setLoadingCod] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrderCod] = usePayOrderCodMutation();
  const [confirmAdminPayment] = useConfirmAdminPaymentMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [cancelOrder, { isLoading: loadingCancel }] = useCancelOrderMutation();

  useEffect(() => {
    if (orderId) {
      refetch();
    }
  }, [orderId, refetch]);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      toast.success("delivered marked");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const payfastData = {
    merchant_id: "10048202",
    merchant_key: "q1r9cn9bvyozx",
    amount: order?.totalPrice,
    item_name: `Order #${order?._id}`,
    m_payment_id: String(order?._id),
    return_url: `https://chalo-baba.vercel.app/order/${order?._id}`,
    cancel_url: `https://chalo-baba.vercel.app/order/${order?._id}`,
    notify_url: ` https://chalo-baba-backend.vercel.app/api/orders/payfast/itn`,
  };

  const payWithPayFast = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payfast.co.za/eng/process";
    Object.keys(payfastData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = payfastData[key];
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const codHandler = async () => {
    setLoadingCod(true);
    try {
      await payOrderCod(orderId).unwrap();
      refetch();
      toast.success("The order has been boocked");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setLoadingCod(false);
    }
  };

  const adminPaymentHandler = async () => {
    try {
      await confirmAdminPayment(orderId).unwrap();
      refetch();
      toast.success("varified payment");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const cancelOrderHandler = async () => {
    if (window.confirm("Do you really want to cancel the order")) {
      try {
        await cancelOrder(orderId).unwrap();
        refetch();
        toast.success("order cancelled");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error} </Message>
  ) : (
    <div className="container mx-auto px-4 py-4 sm:py-8 ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800 ">
        {" "}
        Order ID: <span className="text-blue-600 text-lg">{order._id}</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 border-b  pb-2">
              Shipping Details
            </h2>
            <div className="text-sm sm:text-base text-slate-600 space-y-1.5 mb-3">
              <p className="mb-2">
                <strong>Name:</strong>
                {order.user.name}{" "}
              </p>
              <p className="mb-2">
                <strong>Email:</strong>
                {order.user.email}{" "}
              </p>
              <p className="mb-2">
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.country}
              </p>
            </div>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt?.substring(0, 10)}{" "}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Order Items
            </h2>
            <div className="space-y-3">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                      <img
                         src={item?.image}
                        alt={item.name}
                        className="h-full w-full object-cover  "
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-sm text-slate-800 font-bold truncate  max-w-30
                    sm:max-w-none "
                    >
                      {item.name}
                    </span>
                  <span className="text-sm text-slate-500 font-medium sm:hidden">
                    {item.qty} &times; Rs {item.price}
                  </span>
                  </div>
                  </div>
                  <div className="text-sm text-slate-800 text-right shrink-0 pl-2 self-end pb-0.5 ">
                    <span className="hidden sm:inline text-slate-500 text-xs font-medium mr-1">{item.qty} x Rs{item.price} =</span>
                    
                    <strong className="font-black text-slate-800 "> Rs{(item.qty * item.price).toFixed(2)} </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-3xl h-fit shadow-xl ">
          <h2 className="text-2xl font-bold mb-3 sm:mb-6 border-b border-slate-700 pb-3 sm:pb-5">
            Oder Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Items Price:</span>
              <span>Rs {order.itemsPrice} </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-400 font-medium">
                <span>Discount:({order.discount}%) </span>
                <span>Rs {order.discountAmount} </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Rs {order.shippingPrice} </span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>Rs {order.taxPrice} </span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-slate-700 pt-3 mt-3">
              <span>Total Bill:</span>
              <span className="text-blue-400">{order.totalPrice} </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {!order.isPaid &&
              order.paymentMethod === "PayFast" &&
              !order.isCancelled && (
                <div className="mb-3">
                  <button
                    onClick={payWithPayFast}
                    className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-amber-500/20"
                  >
                    Pay with {order.paymentMethod}
                  </button>
                </div>
              )}
          </div>

          {userInfo &&
            userInfo.isAdmin &&
            !order.isPaid &&
            !order.isCancelled &&
            order.paymentMethod === "COD" && (
              <button
                type="button"
                className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-xl mt-4 "
                onClick={adminPaymentHandler}
              >
                Mark AS Paid (Received Cash){" "}
              </button>
            )}

          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            !order.isDelivered &&
            !order.isCancelled &&
            (order.isPaid || order.paymentMethod === "COD") && (
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl mt-4 
          hover:bg-blue-700 transition  "
                onClick={deliverOrderHandler}
              >
                Mark As Delivered
              </button>
            )}

          {userInfo &&
            userInfo.isAdmin &&
            !order.isPaid &&
            !order.isCancelled && (
              <button
                className="w-full bg-red-600 text-white py-2.5 sm:py-3 rounded-xl mt-4 
          hover:bg-red-700 transtion font-bold "
                onClick={cancelOrderHandler}
                disabled={loadingCancel}
              >
                {loadingCancel ? <Loader /> : "Cancel Order"}
              </button>
            )}

          {order.isCancelled ? (
            <div className="mt-4">
              <Message variant="danger">
                Cancelled on {new Date(order.cancelledAt).toLocaleDateString()}
              </Message>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default OrderScereen;
