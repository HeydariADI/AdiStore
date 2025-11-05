import Image from "next/image";

export default function ProductsList({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg py-10">
        محصولی یافت نشد.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-10 bg-gradient-to-b from-white via-orange-50/40 to-white font-vazirmatn">
      {products.map((item) => (
        <div
          key={item._id}
          className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
        >
          {/* تصویر */}
          <div className="relative w-full h-56 sm:h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src={item.image}
              alt={item.name || "تصویر محصول"}
              width={250}
              height={250}
              className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {item.discount && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {item.discount}٪ تخفیف
              </span>
            )}
          </div>

          {/* محتوا */}
          <div className="p-5 flex flex-col justify-between h-[170px]">
            <h2 className="text-gray-800 font-bold text-lg line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
              {item.name}
            </h2>

            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {item.description}
            </p>

            <div className="flex justify-between items-center mt-5">
              <p className="text-orange-600 font-extrabold text-base">
                {item.price.toLocaleString("fa-IR")} تومان
              </p>

              <button className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300">
                افزودن به سبد خرید
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          {/* افکت نور پایین کارت */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  );
}
