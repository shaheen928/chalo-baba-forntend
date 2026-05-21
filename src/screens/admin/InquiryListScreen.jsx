import React from "react";
import {
  useGetContactMessageQuery,
  useDeleteInquiryMutation,
} from "../../slices/contactApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const InquiryListScreen = () => {
  const { data: inquiries, isLoading, error } = useGetContactMessageQuery();
  const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteInquiry(id).unwrap();
        toast.success("Message deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 tracking-tight text-center sm:text-left">
        User Inquiries & Messages
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || "Failed to load messages"}
        </Message>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden px-4 sm:px-6 py-4">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-175">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Message</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {inquiries?.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500">
                      {inquiry.createdAt?.substring(0, 10)}{" "}
                      {inquiry.createdAt?.substring(11, 16)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-900 whitespace-nowrap">
                      {inquiry.name}
                    </td>
                    <td className="px-4 py-4 text-blue-600 whitespace-nowrap">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FaEnvelope className="text-slate-400 text-xs" />{" "}
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 max-w-63 sm:min-w-88  wrap-break-words leading-relaxed">
                      <div className="max-h-32 overflow-y-auto whitespace-pre-line wrap-break-words pr-1 text-slate-600">
                      {inquiry.message}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => deleteHandler(inquiry._id)}
                        disabled={isDeleting}
                        className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white p-2.5 rounded-xl transition-all"
                        title="Delete Message"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {(!inquiries || inquiries.length === 0) && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-8 text-slate-400 font-medium"
                    >
                      No inquires or messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryListScreen;
