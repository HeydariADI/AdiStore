"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const emailParam = searchParams.get("email");
      if (!emailParam) {
        setError("ایمیل یافت نشد. لطفاً دوباره تلاش کنید.");
      } else {
        setEmail(emailParam);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 rounded-xl shadow-md w-80 bg-white text-center">
        <h2 className="text-2xl font-semibold mb-4">لینک ورود ارسال شد</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-gray-700 mb-3">
            لینک ورود به آدرس ایمیل <strong>{email}</strong> ارسال شد.
          </p>
        )}
        <p className="text-gray-500 text-sm">
          لطفاً ایمیل خود را بررسی کنید و روی لینک کلیک کنید تا وارد سایت شوید.
        </p>
        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => router.push("/authentication/login")}
        >
          بازگشت به صفحه ورود
        </button>
      </div>
    </div>
  );
}
