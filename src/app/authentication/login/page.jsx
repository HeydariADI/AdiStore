"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState("email"); // email یا phone
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (method === "email") {
        const res = await signIn("email", { email: value, redirect: false });
        if (res?.error)
          setError(res.error || "خطایی رخ داد. دوباره تلاش کنید.");
        else router.push(`/check-email?email=${encodeURIComponent(value)}`);
      } else {
        const response = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: value }),
        });
        if (response.ok)
          router.push(`/verify-otp?phone=${encodeURIComponent(value)}`);
        else {
          const data = await response.json();
          setError(data.error || "خطایی در ارسال کد پیش آمد.");
        }
      }
    } catch (err) {
      setError("خطای شبکه یا سرور. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* سمت چپ: فرم */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">
            ورود به حساب
          </h2>

          <div className="flex gap-2 mb-6 justify-center">
            <button
              onClick={() => setMethod("email")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                method === "email"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              }`}
            >
              ایمیل
            </button>
            <button
              onClick={() => setMethod("phone")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                method === "phone"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              }`}
            >
              موبایل
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type={method === "email" ? "email" : "tel"}
              placeholder={
                method === "email"
                  ? "ایمیل خود را وارد کنید"
                  : "شماره موبایل خود را وارد کنید"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-orange-300 rounded-xl w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-orange-700 transition disabled:bg-orange-300"
              disabled={isLoading || value.length === 0}
            >
              {isLoading
                ? "در حال ارسال..."
                : method === "email"
                ? "دریافت لینک ورود"
                : "دریافت کد"}
            </button>
          </form>

          <div className="flex gap-4 mt-6 justify-center">
            <button className="flex-1 bg-white border border-gray-300 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              Google
            </button>
          </div>
        </div>
      </div>

      {/* سمت راست: تصویر */}
      <div className="flex-1 relative hidden md:flex items-center justify-center bg-gray-100 rounded-l-3xl overflow-hidden">
        <Image
          src="/images/login-side.jpg"
          alt="Team illustration"
          fill
          className="object-cover"
        />
        <div className="absolute top-6 left-6 bg-white/70 rounded-xl p-4 shadow-md">
          <p className="font-semibold">Daily Meeting</p>
          <p className="text-sm text-gray-600">12:00pm-01:00pm</p>
        </div>
      </div>
    </div>
  );
}
