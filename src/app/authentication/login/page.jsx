"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState("email");
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
        if (res?.error) setError(res.error);
        else router.push(`/check-email?email=${encodeURIComponent(value)}`);
      } else {
        const response = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: value }),
        });

        if (response.ok) {
          router.push(`/verify-otp?phone=${encodeURIComponent(value)}`);
        } else {
          const data = await response.json();
          setError(data.error || "خطایی رخ داد.");
        }
      }
    } catch (err) {
      setError("خطای شبکه یا سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-amber-50">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-orange-600">
            ورود به حساب
          </h2>

          <div className="flex gap-2 mb-6 justify-center">
            <button
              onClick={() => setMethod("email")}
              className={`p-2 sm:p-3 w-1/3 sm:w-1/4 rounded-xl font-medium text-lg sm:text-xl transition ${
                method === "email"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              }`}
            >
              ایمیل
            </button>

            <button
              onClick={() => setMethod("phone")}
              className={`p-2 sm:p-3 w-1/3 sm:w-1/4 rounded-xl font-medium text-lg sm:text-xl transition ${
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
              className="border border-orange-300 rounded-xl px-3 sm:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-lg sm:text-xl shadow-lg hover:bg-orange-700 transition disabled:bg-orange-300"
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
            <button className="flex-1 bg-white border border-gray-300 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition text-lg sm:text-xl">
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
