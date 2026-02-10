"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import SearchBox from "../SearchBox/SearchBox";
import CartPreviewModal from "../CartPreviewModal/CartPreviewModal";
import { useCart } from "@/context/CartContext";

import {
  ClipboardDocumentListIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  Squares2X2Icon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  return (
    <>
      {/* موبایل بالا */}
      <div className="md:hidden flex justify-between items-center sticky top-0 z-50 bg-white shadow p-3">
        <SearchBox />
        <Link href="/">
          <img src="/images/logo/logo4.png" alt="logo" className="w-20" />
        </Link>
      </div>

      {/* دسکتاپ */}
      <header className="hidden md:block w-full bg-white shadow font-vazirmatn">
        {/* ردیف بالا */}
        <div className="bg-gray-100">
          <div className="container mx-auto flex items-center justify-between h-20">
            {/* منو سمت چپ */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/orders"
                className="flex items-center gap-2 hover:text-orange-600"
              >
                <ClipboardDocumentListIcon className="w-5 h-5" />
                سفارش‌ها
              </Link>

              {/* سبد خرید + مودال */}
              <div
                className="relative"
                onMouseEnter={() => setShowCart(true)}
                onMouseLeave={() => setShowCart(false)}
              >
                <Link
                  href="/cart"
                  className="flex items-center gap-2 hover:text-orange-600"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  سبد خرید
                  {cartItemCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {showCart && <CartPreviewModal />}
              </div>

              <Link
                href="/authentication/login"
                className="flex items-center gap-2 hover:text-orange-600"
              >
                <UserIcon className="w-5 h-5" />
                ورود
              </Link>
            </div>

            {/* سرچ */}
            <div className="flex-1 px-4">
              <SearchBox />
            </div>

            {/* لوگو */}
            <Link href="/">
              <img
                src="/images/logo/logo4.png"
                alt="Adistor"
                className="w-24"
              />
            </Link>
          </div>
        </div>

        {/* نوبار */}
        <div className="bg-gray-200">
          <div className="container mx-auto p-3">
            <Navbar />
          </div>
        </div>
      </header>

      {/* موبایل پایین */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t shadow z-50 p-3">
        <div className="flex justify-between text-xs">
          <Link href="/" className="flex flex-col items-center">
            <HomeIcon className="w-6 h-6" />
            خانه
          </Link>

          <Link href="/categories" className="flex flex-col items-center">
            <Squares2X2Icon className="w-6 h-6" />
            دسته‌ها
          </Link>

          <Link href="/cart" className="flex flex-col items-center relative">
            <ShoppingCartIcon className="w-6 h-6" />
            سبد خرید
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-orange-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link href="/blog" className="flex flex-col items-center">
            <NewspaperIcon className="w-6 h-6" />
            بلاگ
          </Link>

          <Link href="/account" className="flex flex-col items-center">
            <UserIcon className="w-6 h-6" />
            ورود
          </Link>
        </div>
      </div>
    </>
  );
}
