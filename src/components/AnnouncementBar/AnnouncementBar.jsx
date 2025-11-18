"use client";

import React, { useEffect, useState } from "react";
import { MegaphoneIcon } from "@heroicons/react/24/outline";

function AnnouncementBar() {
  const announcements = [
    {
      text: "🖤 بلک فرایدی ادی‌استور — تخفیف‌های ویژه تا ۵۰٪ فقط امروز!",
      bg: "bg-black",
    },
    {
      text: "🎉 ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان — فقط تا پایان این هفته!",
      bg: "bg-orange-500",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % announcements.length);

        setFade(true);
      }, 700);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full text-white py-3 px-4 font-vazirmatn flex items-center justify-center gap-2 transition-colors duration-500 ${announcements[index].bg}`}
    >
      <MegaphoneIcon className="w-5 h-5 text-white" />

      <p
        className={`
          text-sm md:text-base font-medium
          transition-all duration-500
          ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        {announcements[index].text}
      </p>
    </div>
  );
}

export default AnnouncementBar;
