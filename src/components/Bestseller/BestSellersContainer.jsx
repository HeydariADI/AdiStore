"use client";
import { useEffect, useState } from "react";
import BestSellers from "../Bestseller/Bestseller";

export default function BestSellersContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    fetch(`${baseUrl}/api/products?best=true`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">در حال بارگذاری...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-600">محصول پرفروشی یافت نشد.</p>;
  }

  return <BestSellers products={products} />;
}
