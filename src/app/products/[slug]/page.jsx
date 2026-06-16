"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("PAGE SLUG:", slug);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

      const res = await fetch(`/api/products/${slug}`, {
  cache: "no-store",
});

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);

      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!product) return <p>محصولی یافت نشد 😢</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt="" />
      <p>{product.price}</p>

      <button onClick={() => addToCart(product)}>
        افزودن به سبد
      </button>
    </div>
  );
}