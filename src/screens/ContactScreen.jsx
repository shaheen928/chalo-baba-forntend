


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { useCreateContactMessageMutation } from "../slices/contactApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [createContactMessage, { isLoading }] =
    useCreateContactMessageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createContactMessage({ name, email, message }).unwrap();
      toast.success(`Thank you ${name}! Your message has been sent.`);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl animate-fadeIn">
      <Link
        to="/"
        className="bg-slate-200 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-800 hover:text-white transition-all mb-6 inline-block font-bold text-sm"
      >
        Go To Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        <div className="md:col-span-1 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between min-w-0 md:h-full">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Contact Info
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed antialiased">
              Have any questions, feedback, or need assistance with your
              shopping? We are always here to help you! Reach out to the Chalo
              Baba support team, and we will make sure to address your inquiries
              and get back to you with a complete solution within 24 hours. Your
              satisfaction is our top priority.
            </p>
          </div>

          <div className="space-y-5  my-auto py-6">
            <a
              href="mailto:bilalahmad.shaheen@gmail.com"
              className="flex items-center flex-nowrap gap-3 bg-slate-800 px-4 py-4 rounded-2xl hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium overflow-hidden"
              title="bilalahmad.shaheen@gmail.com"
            >
              <FaEnvelope className="text-blue-400 shrink-0" size={16} />
              <span className="whitespace-nowrap">
                bilalahmad.shaheen@gmail.com
              </span>
            </a>

            <a
              href="tel:+923007255928"
              className="flex items-center flex-nowrap gap-3 bg-slate-800 px-4 py-4 rounded-2xl hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium"
            >
              <FaPhoneAlt className="text-blue-400 shrink-0" size={14} />
              <span className="whitespace-nowrap">+92 300 7255928</span>
            </a>
          </div>

          <div className="text-[11px] text-slate-500 pt-4 border-t border-slate-800 text-center md:text-left mt-auto">
            Chalo Baba Support Team
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-100 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-blue-400 mt-2"
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
