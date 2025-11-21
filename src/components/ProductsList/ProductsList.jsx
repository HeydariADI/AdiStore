"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductsList({ products }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all overflow-hidden flex flex-col items-center p-6"
        >
          <Link
            href={`/products/${product._id}`}
            className="w-full flex flex-col items-center"
          >
            <div className="w-56 h-56 mb-4 flex items-center justify-center bg-white rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain rounded-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {product.title}
            </h2>
            <p className="text-orange-600 font-bold mt-3 text-lg">
              {product.price.toLocaleString()} تومان
            </p>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-2/3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-2xl transition-colors duration-300"
          >
            اضافه به سبد خرید
          </button>
        </div>
      ))}
    </div>
  );
}
