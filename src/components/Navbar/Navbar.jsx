"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import CartIcon from "../CartIcon/CartIcon";
import { useCart } from "@/context/CartContext";

function Navbar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { cart } = useCart();

  // مجموع تعداد محصولات در سبد
  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center gap-6 text-lg font-medium relative">
        <Link href="authentication/login" className="login relative">
          <UserIcon className="h-6 w-6 text-gray-700" />
        </Link>

        <Link href="/cart" className="relative">
          <CartIcon />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>

        <Link href="/">صفحه اصلی</Link>
        <Link href="/products">محصولات</Link>
        <Link href="/about">درباره ما</Link>
        <Link href="/contact">تماس با ما</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-100 transition"
        onClick={() => setMobileNavActive(!mobileNavActive)}
      >
        {mobileNavActive ? (
          <XMarkIcon className="w-7 h-7 text-gray-700" />
        ) : (
          <Bars3Icon className="w-7 h-7 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu */}
      {mobileNavActive && (
        <div className="absolute top-12 left-0 w-52 bg-white shadow-lg rounded-lg flex flex-col items-start gap-3 p-4 z-50 border">
          <Link
            href="/"
            className="w-full hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            صفحه اصلی
          </Link>
          <Link
            href="/about"
            className="w-full hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            درباره ما
          </Link>
          <Link
            href="/contact"
            className="w-full hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            تماس با ما
          </Link>
          <Link
            href="authentication/login"
            className="flex items-center gap-2 hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            <UserIcon className="h-5 w-5" /> ورود
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-brand transition relative"
            onClick={() => setMobileNavActive(false)}
          >
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-0.5 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
