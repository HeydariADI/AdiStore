"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CACHE = {}; // Simple in-memory cache

export default function SearchBox({ categories = [] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const router = useRouter();
  const inputRef = useRef();
  const timeoutRef = useRef();

  // Load recent searches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);
  }, []);

  const fetchResults = async (q, category) => {
    const key = `${q}-${category}`;
    if (CACHE[key]) return setResults(CACHE[key]);

    try {
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(q)}&category=${category}`,
      );
      const data = await res.json();
      CACHE[key] = data;
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchResults(query, activeCategory);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query, activeCategory]);

  const handleSearch = (q = query) => {
    if (!q) return;

    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);

    const catQuery =
      activeCategory !== "all" ? `&category=${activeCategory}` : "";
    router.push(`/products?search=${encodeURIComponent(q)}${catQuery}`);
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 p-4 h-15 text-xl border rounded-lg bg-white">
        <FaSearch size={20} color="#e86908" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={focused ? "جستجو در همه محصولات..." : "جستجو..."}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="flex-1 outline-none bg-transparent"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* دسته‌بندی */}
      {focused && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeCategory === cat.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-orange-100"
              }`}
              onMouseDown={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* نتایج */}
      {focused && (results.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-12 right-0 left-0 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.length > 0
            ? results.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => router.push(`/products/${item.slug}`)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))
            : recentSearches.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSearch(item)}
                >
                  {item}
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
