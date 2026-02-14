"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // آیکون گوگل

export default function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // ---------------- Phone Validation ----------------
      if (!/^09\d{9}$/.test(value)) {
        setError("شماره موبایل معتبر نیست");
        setIsLoading(false);
        return;
      }

      // ---------------- Send OTP ----------------
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
    } catch (err) {
      setError("خطای شبکه یا سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-orange-600">
            ورود به حساب
          </h2>

          {/* ---------------- Google Login ---------------- */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl shadow-md border hover:shadow-lg transition bg-white hover:bg-gray-50 text-lg sm:text-xl font-medium mb-6"
          >
            <FcGoogle size={24} />
            ورود با گوگل
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">
              یا ورود با موبایل
            </span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* ---------------- Phone Login ---------------- */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="tel"
              placeholder="شماره موبایل خود را وارد کنید"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-lg sm:text-xl shadow-lg hover:bg-orange-700 transition disabled:bg-orange-300"
              disabled={isLoading || value.length === 0}
            >
              {isLoading ? "در حال ارسال..." : "دریافت کد"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
