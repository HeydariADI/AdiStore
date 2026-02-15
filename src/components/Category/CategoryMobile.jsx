import Link from "next/link";

export default function CategoryMobile() {
  const categories = [
    { name: "لپ‌تاپ", category: "laptop", image: "/images/laptop/2.jpg" },
    { name: "موبایل", category: "mobile", image: "/images/mobile/mobile2.jpg" },
    {
      name: "هدفون",
      category: "headphone",
      image: "/images/headphone/headphone3.jpg",
    },
    { name: "گجت", category: "game", image: "/images/game/1.jpg" },
  ];

  return (
    <section className="px-4 mt-4">
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat.category}
            href={`/products/category/${cat.category}`}
            className="min-w-[80px] flex flex-col items-center"
          >
            <img
              src={cat.image}
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="text-sm mt-2">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
