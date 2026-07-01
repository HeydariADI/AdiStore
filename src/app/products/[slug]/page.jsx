"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="py-20 text-center">
        Product not found
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid grid-cols-12 gap-8">

        {/* Image */}

        <div className="col-span-4">

          <div className="border rounded-xl p-8 bg-white">

            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-contain"
            />

          </div>

        </div>

        {/* Information */}

        <div className="col-span-5 space-y-6">

          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <div className="flex gap-5 text-sm">

            <span className="text-yellow-500">
                ⭐ {product.rating}
            </span>

            <span className="text-gray-500">
                ({product.reviews} Reviews)
            </span>

            <span className="text-green-600">
                {product.inStock ? "In Stock" : "Out of Stock"}
            </span>

          </div>

          <p className="text-gray-600 leading-8">
            {product.description}
          </p>

          <hr />

          <div>

            <h3 className="font-semibold mb-3">
              Colors
            </h3>

            <div className="flex gap-3">

              {product.colors?.map((color) => (

                <button
                  key={color}
                  className="border rounded-lg px-4 py-2 hover:border-blue-600"
                >
                  {color}
                </button>

              ))}

            </div>

          </div>

          <hr />

          <div>

            <h3 className="font-semibold mb-4">
              Specifications
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>CPU</span>
                <span>{product.features.cpu}</span>
              </div>

              <div className="flex justify-between">
                <span>RAM</span>
                <span>{product.features.ram}</span>
              </div>

              <div className="flex justify-between">
                <span>Storage</span>
                <span>{product.features.storage}</span>
              </div>

              <div className="flex justify-between">
                <span>Display</span>
                <span>{product.features.display}</span>
              </div>

            </div>

          </div>

        </div>

        {/* Purchase Box */}

        <div className="col-span-3">

          <div className="sticky top-24 border rounded-xl bg-white p-6 shadow-sm">

            <p className="text-gray-500">
             AdiStore
            </p>

            <h2 className="text-3xl font-bold my-5">

              {product.price.toLocaleString()} تومان

            </h2>

            <p>😍 بهترین قیمت در 30 روز گذشته</p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-red-600 text-white rounded-lg py-3 hover:bg-red-700 transition"
            >
              افزودن به سبد خرید
            </button>
            <br/>
            <p>🔅18 ماه گارانتی</p>

          </div>

        </div>

      </div>

    </div>
  );
}