"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const sessionData = useSession(); // useSession رو یکبار ذخیره می‌کنیم
  const session = sessionData?.data;
  const status = sessionData?.status;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // هنوز session آماده نیست

    if (!session) {
      router.push("/authentication/login"); // ریدایرکت به صفحه لاگین
    } else {
      setLoading(false); // session آماده است
    }
  }, [session, status, router]);

  // نمایش loading تا session آماده شود
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  // ایمنی اضافی: اگر session موجود نبود، صفحه خالی باشه
  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 rounded-xl shadow-md w-96 bg-white text-center">
        <h1 className="text-3xl font-bold mb-4">خوش آمدید!</h1>
        <p className="mb-4">
          ایمیل شما: <strong>{session.user?.email}</strong>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/authentication/login" })}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
