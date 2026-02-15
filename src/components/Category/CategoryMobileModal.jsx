"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CategoryMobileModal({ onClose }) {
  const categories = [
    { name: "لپ‌تاپ", slug: "laptop" },
    { name: "موبایل", slug: "mobile" },
    { name: "هدفون", slug: "headphone" },
    { name: "گجت‌ها", slug: "game" },
  ];

  return (
    <>
      {/* بک‌دراپ */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* شیت پایین */}
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-4 animate-slideUp">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">دسته‌بندی‌ها</h3>
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/category/${cat.slug}`}
              onClick={onClose}
              className="border rounded-lg p-4 text-center hover:bg-gray-100"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
