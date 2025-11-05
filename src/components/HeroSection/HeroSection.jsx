import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <section className="w-full  flex flex-col-reverse md:flex-row justify-between items-center p-8 md:p-16 font-vazirmatn relative overflow-hidden bg-gry-50">
      {/* متن */}
      <div className="hero-text w-full md:w-1/2 text-center md:text-right mt-8 md:mt-0 md:pr-10 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug mb-6 animate-slideInLeft">
          تجربه‌ای هوشمند از خرید دیجیتال
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-slideInLeft delay-200">
          انتخاب کن، سفارش بده، لذت ببر.
        </p>
        <Link href="/products">
          <button className="bg-amber-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-amber-600 hover:scale-105 transition transform shadow-lg">
            همین حالا خرید کن
          </button>
        </Link>
      </div>

      {/* تصویر */}
      <div className="w-full md:w-2/3 flex justify-center z-10 ml-10">
        <img
          src="/images/1.jpg"
          alt="خرید دیجیتال"
          className="w-xl h-xl md:w-xl md:h-xl object-contain rounded-2xl shadow-2xl transform transition duration-700 hover:scale-110 hover:-translate-y-2 bg-"
        />
      </div>

      {/* اشکال تزئینی نیمه شفاف */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-yellow-200 rounded-full opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-15 w-80 h-80 bg-orange-300 rounded-full opacity-20 animate-pulse -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-100 rounded-full opacity-40 -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
    </section>
  );
}

export default HeroSection;
