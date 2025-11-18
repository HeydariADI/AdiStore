import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <div className=" flex items-center gap-2 p-2 h-10  border rounded-lg font-vazirmatn">
      <FaSearch size={22} color="#e86908" />
      <input
        type="text"
        placeholder="جستجو..."
        className="flex-1 outline-none md:p-2"
      />
    </div>
  );
}
