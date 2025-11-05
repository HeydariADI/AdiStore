"use client";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <section className="font-vazirmatn bg-orange-50 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-14">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          تماس با ما
        </h1>

        <p className="text-center text-gray-600 mb-12 leading-relaxed">
          خوشحال می‌شویم نظرات، سوالات یا پیشنهادهای شما را بشنویم. از طریق فرم
          زیر یا اطلاعات تماس، با ما در ارتباط باشید.
        </p>

        {/* بخش اطلاعات تماس */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-center">
          <div className="flex flex-col items-center bg-orange-100 rounded-xl py-6 px-4">
            <PhoneIcon className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-800">شماره تماس</h3>
            <p className="text-gray-600 mt-1">۰۲۱-۱۲۳۴۵۶۷۸</p>
          </div>

          <div className="flex flex-col items-center bg-orange-100 rounded-xl py-6 px-4">
            <EnvelopeIcon className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-800">ایمیل</h3>
            <p className="text-gray-600 mt-1">info@adistor.com</p>
          </div>

          <div className="flex flex-col items-center bg-orange-100 rounded-xl py-6 px-4">
            <MapPinIcon className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-800">آدرس</h3>
            <p className="text-gray-600 mt-1">
              تهران، خیابان ولیعصر، کوچه دیجیتال
            </p>
          </div>
        </div>

        {/* فرم تماس */}
        <form className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">نام</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">ایمیل</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              placeholder="example@email.com"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-gray-700 mb-2">پیام شما</label>
            <textarea
              rows="5"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              placeholder="پیام خود را بنویسید..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg font-semibold transition"
            >
              ارسال پیام
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
