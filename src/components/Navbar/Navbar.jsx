"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <nav className="relative">
      <div className="hidden md:flex justify-center md:justify-start items-center gap-6 text-lg font-medium relative ">
        <Link href="/">صفحه اصلی</Link>
        <Link href="/products">محصولات</Link>
        <Link href="/about">درباره ما</Link>
        <Link href="/contact">تماس با ما</Link>
      </div>

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
        <div className="absolute top-12 right-0 w-52 bg-white shadow-lg rounded-lg flex flex-col items-start gap-3 p-4 z-50 border">
          <Link
            href="/"
            className="w-full hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            صفحه اصلی
          </Link>
          <Link
            href="/products"
            className="w-full hover:text-brand transition"
            onClick={() => setMobileNavActive(false)}
          >
            محصولات
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
