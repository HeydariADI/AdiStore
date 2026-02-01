// کامپوننت مودال
function AddressModal({ isOpen, onClose }) {
  const [address, setAddress] = useState("");

  const handleSave = () => {
    // در اینجا منطق ذخیره آدرس را پیاده‌سازی کنید
    console.log("آدرس:", address);
    onClose(); // مودال را ببندید
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">افزودن آدرس</h2>
        <input
          type="text"
          placeholder="آدرس خود را وارد کنید"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleSave}
          className="bg-orange-500 p-2 rounded text-white w-full"
        >
          ذخیره
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 p-2 rounded text-gray-700 w-full mt-2"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
