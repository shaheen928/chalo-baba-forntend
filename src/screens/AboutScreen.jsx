import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaAward, FaUsers } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl animate-fadeIn">
       <Link
        to="/"
        className="bg-slate-200 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-800 hover:text-white transition-all mb-6 inline-block font-bold text-sm"
      >
        Go To Home
      </Link>

       <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900 tracking-tight text-center sm:text-left">
          About <span className="text-blue-600">CHALO BABA</span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg mb-8 text-center sm:text-left leading-relaxed">
          Welcome to Chalo Baba your own premium digital shop. We are dedicated to providing you the very best of quality products, with a focus on reliability, customer service, and uniqueness.
        </p>

        <hr className="border-slate-100 mb-8" />

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center sm:text-left space-y-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit mx-auto sm:mx-0">
              <FaAward size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Best Quality</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We carefully select and test every product to ensure it meets our strict quality standards before reaching you.
            </p>
          </div>

           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center sm:text-left space-y-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-xl w-fit mx-auto sm:mx-0">
              <FaTruck size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Fast Delivery</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our commitment is fast, secure, and reliable shipping. We value your time and get your packages delivered swiftly.
            </p>
          </div>

           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center sm:text-left space-y-3">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl w-fit mx-auto sm:mx-0">
              <FaUsers size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Our Commitment</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We believe in creating a shopping environment based on trust, ease of communication, and absolute customer satisfaction.
            </p>
          </div>

        </div>

         <div className="mt-10 bg-blue-50/50 border border-blue-100/50 p-6 rounded-2xl text-center">
          <p className="text-slate-700 font-medium text-sm sm:text-base">
            "Thank you for choosing Chalo Baba. We hope you enjoy our products as much as we enjoy offering them to you."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;