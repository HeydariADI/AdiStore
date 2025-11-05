"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) setError("ایمیل یافت نشد. لطفاً دوباره تلاش کنید.");
  }, [email]);

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
