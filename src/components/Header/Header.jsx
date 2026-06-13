"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import SearchBox from "../SearchBox/SearchBox";
import CartPreviewModal from "../CartPreviewModal/CartPreviewModal";
import CategoryMobileModal from "../Category/CategoryMobileModal";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const [showCart, setShowCart] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
      {/* موبایل بالا - ارتقای UX سرچ */}
      <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm px-3 py-2 flex items-center gap-2">
        
        {/* سرچ کشیده‌تر و طبیعی‌تر */}
        <div className="flex-1">
          <div className="w-full rounded-lg bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-400 transition shadow-sm">
            <SearchBox />
          </div>
        </div>

        {/* لوگو */}
        <Link href="/" className="shrink-0">
          <img
            src="/images/logo/logo4.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />
        </Link>
      </div>

      {/* دسکتاپ */}
      <header className="hidden md:block w-full bg-white shadow font-vazirmatn">
        <div className="bg-gray-50">
          <div className="container mx-auto flex items-center justify-between h-24 px-6">
            <Link href="/">
              <img
                src="/images/logo/logo4.png"
                alt="Adistor"
                className="w-24 h-auto"
              />
            </Link>

            <div className="flex-1 px-4 py-3 max-w-full">
              <SearchBox />
            </div>

            <div className="flex items-center gap-8 text-sm">
              <Link
                href="/orders"
                className="flex items-center gap-2 hover:text-orange-600 transition"
              >
                <ClipboardDocumentListIcon className="w-5 h-5" />
                سفارش‌ها
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setShowCart(true)}
                onMouseLeave={() => setShowCart(false)}
              >
                <Link
                  href="/cart"
                  className="flex items-center gap-2 hover:text-orange-600 transition"
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

              {session?.user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 hover:text-orange-600 transition"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      className="w-6 h-6 rounded-full"
                      alt="user"
                    />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                  {session.user.name}
                </Link>
              ) : (
                <Link
                  href="/authentication/login"
                  className="flex items-center gap-2 hover:text-orange-600 transition"
                >
                  <UserIcon className="w-5 h-5" />
                  ورود
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100">
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

          <button
            onClick={() => setShowCategories(true)}
            className="flex flex-col items-center"
          >
            <Squares2X2Icon className="w-6 h-6" />
            دسته‌ها
          </button>

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

          {session?.user ? (
            <Link href="/dashboard" className="flex flex-col items-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  className="w-6 h-6 rounded-full"
                  alt="user"
                />
              ) : (
                <UserIcon className="w-6 h-6" />
              )}
              <span className="text-[10px] mt-1">
                {session.user.name?.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link href="/authentication/login" className="flex flex-col items-center">
              <UserIcon className="w-6 h-6" />
              ورود
            </Link>
          )}
        </div>
      </div>

      {showCategories && (
        <CategoryMobileModal onClose={() => setShowCategories(false)} />
      )}
    </>
  );
}