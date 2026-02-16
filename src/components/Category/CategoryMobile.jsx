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
      <h2 className="text-sm font-semibold mb-3">دسته‌بندی‌ها</h2>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.category}
            href={`/products/category/${cat.category}`}
            className="flex flex-col items-center active:scale-95 transition"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs mt-2 text-center">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
