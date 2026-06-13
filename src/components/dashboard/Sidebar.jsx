"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">

      {/* Top Menu */}
      <div>
        <h1 className="text-xl font-bold text-orange-600 mb-8">
          داشبورد
        </h1>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link href="/dashboard" className="hover:text-orange-500">
            🏠 خانه
          </Link>

          <Link href="/products" className="hover:text-orange-500">
            🛍 محصولات
          </Link>

          <Link href="/orders" className="hover:text-orange-500">
            📦 سفارش‌ها
          </Link>

          <Link href="/settings" className="hover:text-orange-500">
            ⚙️ تنظیمات
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/authentication/login" })}
        className="text-red-500 hover:text-red-700 text-sm mt-10"
      >
        خروج از حساب
      </button>

    </aside>
  );
}