"use client";

import { useCart } from "context/CartContext";
import Link from "next/link";
import React, { useState } from "react";

function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleAddress = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 p-5">
      {/* بخش آدرس */}
      <div className="w-full lg:w-2/3 flex flex-col text-2xl font-medium space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4 p-5 border-b border-gray-200">
          <p className="text-lg lg:text-2xl font-bold">آدرس تحویل</p>
          <Link href="/cart" className="text-orange-500 text-lg lg:text-xl">
            ➡ بازگشت به سبد خرید
          </Link>
        </div>

        <button
          onClick={handleAddress}
          className="border border-amber-400 p-6 rounded-2xl text-2xl lg:text-2xl cursor-pointer font-bold text-orange-500 w-full sm:w-auto"
        >
          افزودن آدرس +
        </button>

        <p className="rounded-2xl p-6 mt-7 bg-amber-50 font-light text-center text-base lg:text-lg">
          برای انتخاب شیوه و زمان ارسال، ابتدا آدرس تحویل را ثبت کنید.
        </p>
      </div>

      {/* بخش صورتحساب */}
      <div className="w-full lg:w-1/3 p-6 lg:p-10 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-10 text-center lg:text-left">
            صورتحساب
          </h1>
        </div>

        <div className="border border-gray-200 shadow w-full p-6 lg:p-10 flex flex-col gap-6 lg:gap-10 text-xl">
          <div className="flex justify-between items-center">
            <p>قیمت محصول</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <div className="flex justify-between items-center font-bold text-lg">
            <p>جمع کل</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <button
            // اگر صفحه بعدی Checkout هست، router.push را به صفحه مقصد تغییر بده
            className="bg-orange-500 p-4 lg:p-6 rounded-xl text-white text-2xl font-medi w-full hover:bg-orange-600 transition"
          >
            تایید و ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
