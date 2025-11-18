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
      icon: <TruckIcon className="w-10 h-10 text-orange-500" />,
      title: "ارسال سریع و مطمئن",
      desc: "تحویل فوری در سراسر کشور با بسته‌بندی ایمن",
    },
    {
      id: 2,
      icon: <ShieldCheckIcon className="w-10 h-10 text-orange-500" />,
      title: "ضمانت اصالت کالا",
      desc: "کالاهای اورجینال با گارانتی معتبر شرکتی",
    },
    {
      id: 3,
      icon: <PhoneIcon className="w-10 h-10 text-orange-500" />,
      title: "پشتیبانی ۲۴ ساعته",
      desc: "در هر زمان پاسخگوی سوالات و مشکلات شما هستیم",
    },
  ];

  return (
    <section className="bg-white py-16 font-vazirmatn mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          چرا از ما خرید کنید؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((b) => (
            <div
              key={b.id}
              className="flex flex-col items-center text-center bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              {b.icon}
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600 text-base">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreBenefits;
