"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/authentication/login");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  // قبل از دسترسی به session چک میکنیم
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!session) return null; // فقط برای ایمنی

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
