"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/authentication/login");
      return;
    }

    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("خطا در بارگذاری اطلاعات کاربر");
        setLoading(false);
      });
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-amber-50">
        <p className="text-orange-600 text-xl font-semibold">
          در حال بارگذاری...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-amber-50 p-4">
      <div className="m-auto w-full sm:w-3/4 lg:w-2/3 p-6 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          خوش آمدی، {userData?.user?.name || userData?.user?.email}!
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <h2 className="text-xl font-semibold mb-3">سفارشات اخیر</h2>
        {userData?.orders?.length > 0 ? (
          <ul className="space-y-2 mb-6">
            {userData.orders.map((order) => (
              <li
                key={order._id}
                className="border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <span>سفارش #{order._id}</span>
                <span>تعداد محصولات: {order.products.length}</span>
                <span>
                  مجموع:{" "}
                  {order.products.reduce((sum, p) => sum + (p.price || 0), 0)}{" "}
                  تومان
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mb-6">سفارشی یافت نشد.</p>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/authentication/login" })}
          className="w-full bg-red-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-red-700 transition"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
