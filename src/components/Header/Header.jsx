"use client";

import Link from "next/link";
import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchBox from "../SearchBox/SearchBox";

import { useCart } from "../../context/CartContext";
import {
  ClipboardDocumentListIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  Squares2X2Icon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
      <div className="md:hidden flex justify-center items-center sticky top-0 z-50 bg-white shadow">
        {/* سرچ باکس */}
        <div className="px-3 pb-3 mt-2">
          <SearchBox />
        </div>
        <div className="flex items-center justify-between p-3">
          {/* لوگو */}
          <div className="w-20">
            <Link href="/">
              <img
                src="/images/logo2.png"
                alt="logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      <header className="w-full shadow bg-white font-vazirmatn top-0 z-40 hidden md:block">
        {/* ردیف بالا */}
        <div className="w-full flex flex-col justify-center items-center h-20 bg-gray-100">
          <div className="container mx-auto flex items-center justify-between gap-4 p-1">
            {/* منوهای سمت چپ (فقط دسکتاپ) */}
            <div className="flex items-center gap-6 text-sm md:text-base">
              <Link
                href="/orders"
                className="hover:text-orange-600 transition flex items-center gap-2"
              >
                <ClipboardDocumentListIcon className="h-6 w-6 text-gray-700" />
                <span>سفارش‌ها</span>
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 hover:text-brand transition relative"
              >
                <ShoppingCartIcon className="h-6 w-6 text-gray-700" />

                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-orange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}

                <span className="text-gray-700 text-sm hover:text-orange-600">
                  سبد خرید
                </span>
              </Link>

              <Link
                href="/authentication/login"
                className="flex items-center gap-2 hover:text-brand transition"
              >
                <UserIcon className="h-5 w-5" />{" "}
                <span className="hover:text-orange-600">ورود</span>
              </Link>
            </div>

            {/* سرچ */}
            <div className="flex-1 px-2">
              <SearchBox />
            </div>

            {/* لوگو */}
            <div className="flex-shrink-0 w-20 md:w-20 bg-transparent">
              <Link href="/">
                <img
                  src="/images/logo/logo4.png"
                  alt="Adistor Logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* نوبار (فقط دسکتاپ) */}
        <div className="w-full bg-gray-200">
          <div className="container mx-auto p-3">
            <Navbar />
          </div>
        </div>
      </header>

      {/* mobile */}
      <div className="md:hidden fixed bottom-0 right-0 left-0 bg-gray-100 border-t shadow-[0_-2px_6px_rgba(0,0,0,0.1)] z-50 p-3">
        <div className="flex justify-between text-center py-2 px-4 text-xs">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-lg">
              <HomeIcon className="w-6 h-6 text-gray-700" />
            </span>
            <span>خانه</span>
          </Link>

          <Link href="/categories" className="flex flex-col items-center">
            <Squares2X2Icon className="w-6 h-6 text-gray-700" />
            <span>دسته بندی</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center relative">
            <span className="text-lg">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            </span>
            <span>سبد خرید</span>

            {cartItemCount > 0 && (
              <span className="absolute -top-1 left-4 bg-orange-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link href="/blog" className="flex flex-col items-center">
            <NewspaperIcon className="w-6 h-6 text-gray-700" />
            <span>بلاگ</span>
          </Link>

          <Link href="/account" className="flex flex-col items-center">
            <span className="text-lg">
              <UserIcon className="w-6 h-6 text-gray-700" />
            </span>
            <span>ورود</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
