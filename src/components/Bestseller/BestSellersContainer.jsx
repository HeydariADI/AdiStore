"use client";

import { useEffect, useState } from "react";
import BestSellers from "./BestSellers";

export default function BestSellersContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?best=true&all=true")
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
