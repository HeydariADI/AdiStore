import {
  TruckIcon,
  ShieldCheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function StoreBenefits() {
  const benefits = [
    {
      id: 1,
      icon: <TruckIcon className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />,
      title: "ارسال سریع و مطمئن",
      desc: "تحویل فوری در سراسر کشور با بسته‌بندی ایمن",
    },
    {
      id: 2,
      icon: (
        <ShieldCheckIcon className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />
      ),
      title: "ضمانت اصالت کالا",
      desc: "کالاهای اورجینال با گارانتی معتبر شرکتی",
    },
    {
      id: 3,
      icon: <PhoneIcon className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />,
      title: "پشتیبانی ۲۴ ساعته",
      desc: "در هر زمان پاسخگوی سوالات و مشکلات شما هستیم",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 font-vazirmatn">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          چرا از ما خرید کنید؟
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {benefits.map((b) => (
            <div
              key={b.id}
              className="flex flex-col items-center text-center bg-orange-50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              {b.icon}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mt-4 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-base">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreBenefits;
