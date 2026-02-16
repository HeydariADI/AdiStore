"use client";

import { useEffect, useState } from "react";
import BestSellers from "../Bestseller/BestSellers";

export default function BestSellersContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    fetch(`${baseUrl}/api/products?best=true&all=true`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>
    );
  if (!products.length)
    return (
      <p className="text-center text-gray-600 mt-10">محصول پرفروشی یافت نشد.</p>
    );

  return <BestSellers products={products} />;
}
