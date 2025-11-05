import Image from "next/image";
import React from "react";

function SpecialOffer() {
  return (
    <section className="bg-orange-100 py-16 font-vazirmatn">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* تصویر محصول */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/laptop/laptop1.jpg"
            width={400}
            height={400}
            alt="پیشنهاد ویژه لپ‌تاپ"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* توضیحات */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            پیشنهاد ویژه امروز
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            لپ‌تاپ قدرتمند Asus ZenBook با تخفیف استثنایی ۲۰٪ برای مدت محدود!
          </p>
          <p className="text-orange-600 text-2xl font-bold mb-6">
            ۳۶,۸۰۰,۰۰۰ تومان
            <span className="line-through text-gray-400 text-lg ml-3">
              ۴۵,۸۰۰,۰۰۰ تومان
            </span>
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition-all">
            خرید ویژه
          </button>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
