"use client";

import { useRouter } from "next/navigation";
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
    <div className="flex h-screen overflow-hidden bg-amber-50">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600">
            لینک ورود ارسال شد
          </h2>

          {error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : (
            <>
              <p className="text-gray-700 text-lg mb-3 leading-relaxed">
                لینک ورود به آدرس ایمیل زیر ارسال شد:
              </p>
              <p className="text-orange-600 font-bold text-xl mb-4 break-all">
                {email}
              </p>
            </>
          )}

          <p className="text-gray-500 text-sm mb-6">
            لطفاً ایمیل خود را بررسی کنید و روی لینک کلیک کنید تا وارد سایت
            شوید.
          </p>

          <button
            onClick={() => router.push("/authentication/login")}
            className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-orange-700 transition"
          >
            بازگشت به صفحه ورود
          </button>
        </div>
      </div>
    </div>
  );
}
