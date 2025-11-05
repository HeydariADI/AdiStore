import React from "react";
import { MegaphoneIcon } from "@heroicons/react/24/outline";

function AnnouncementBar() {
  return (
    <div className="w-full bg-orange-500 text-white text-center py-3 px-4 font-vazirmatn flex items-center justify-center gap-2">
      <MegaphoneIcon className="w-5 h-5 text-white" />
      <p className="text-sm md:text-base font-medium">
        🎉 ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان — فقط تا پایان این
        هفته!
      </p>
    </div>
  );
}

export default AnnouncementBar;
