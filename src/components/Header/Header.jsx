import Link from "next/link";
import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchBox from "../SearchBox/SearchBox";

function Header() {
  return (
    <header className="w-full shadow bg-white font-vazirmatn sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6">
        {/* ✅ Navbar */}
        <div className="order-2 md:order-1 w-full md:w-auto">
          <Navbar />
        </div>

        {/* ✅ Search Box */}
        <div className="order-3 md:order-2 w-full md:w-2/5">
          <SearchBox />
        </div>

        {/* ✅ Logo */}
        <div className="order-1 md:order-3 w-52 h-40 md:w-24 md:h-24 mx-auto md:mx-0">
          <Link href="/">
            <img
              src="/images/logo2.png"
              alt="Adistor Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
