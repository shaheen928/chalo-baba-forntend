import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaClock, FaUndo, FaShieldAlt } from 'react-icons/fa';

const ShippingPolicyScreen = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl animate-fadeIn">
       <Link
        to="/"
        className="bg-slate-200 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-800 hover:text-white transition-all mb-6 inline-block font-bold text-sm"
      >
        Go To Home
      </Link>

       <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900 tracking-tight">
          Shipping & Return <span className="text-blue-600">Policy</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mb-8">
          Please read our shipping terms and conditions carefully to understand how Chalo Baba handles deliveries and returns.
        </p>

        <div className="space-y-6">
          
           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl h-fit shrink-0">
              <FaClock size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Delivery Timeline</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We safely dispatch all orders within 24 hours. Delivery usually takes **2 to 4 working days** across Pakistan, depending on your city.
              </p>
            </div>
          </div>

           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="bg-green-100 text-green-600 p-3 rounded-xl h-fit shrink-0">
              <FaTruck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Shipping Charges</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We offer a standard flat shipping rate of **Rs. 200** on orders nationwide. Standard weight rules apply.
              </p>
            </div>
          </div>

           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl h-fit shrink-0">
              <FaUndo size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">7-Day Return & Exchange</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                If you receive a damaged or wrong product, you can request an exchange or refund within **7 days** of delivery. The product must be unused and in its original packaging.
              </p>
            </div>
          </div>

           <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl h-fit shrink-0">
              <FaShieldAlt size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Secure Shopping</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your payment and packages are 100% secure with Chalo Baba. For any issues during transit, our support team is available via the Contact page.
              </p>
            </div>
          </div>

        </div>

         <div className="mt-8 text-center text-slate-400 text-xs">
          Last updated: May 2026 | Chalo Baba Digital Shop
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyScreen;