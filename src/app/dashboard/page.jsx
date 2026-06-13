"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-8">
        👋 خوش آمدی {session?.user?.name || "کاربر"}
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">کاربران</p>
          <h2 className="text-2xl font-bold">1,240</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">سفارش‌ها</p>
          <h2 className="text-2xl font-bold">320</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">محصولات</p>
          <h2 className="text-2xl font-bold">85</h2>
        </div>

      </div>

    </div>
  );
}