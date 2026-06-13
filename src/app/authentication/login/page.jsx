"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- Phone OTP ----------------
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!/^09\d{9}$/.test(phone)) {
        setError("شماره موبایل معتبر نیست");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "خطا در ارسال کد");
        return;
      }

      router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setError("خطای شبکه یا سرور");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-vazirmatn">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-10">

        <h1 className="text-2xl font-bold text-center text-orange-600 mb-8">
          ورود به حساب کاربری
        </h1>

        {/* ---------------- GOOGLE LOGIN ---------------- */}
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border shadow-sm hover:shadow-md transition mb-6"
        >
          <FcGoogle size={24} />
          ورود با گوگل
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">یا</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ---------------- ERROR ---------------- */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* ---------------- PHONE LOGIN ---------------- */}
        <form onSubmit={handlePhoneLogin} className="space-y-4">

          <input
            type="tel"
            placeholder="شماره موبایل (09xxxxxxxxx)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !phone}
            className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition disabled:bg-orange-300"
          >
            {isLoading ? "در حال ارسال..." : "دریافت کد ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}