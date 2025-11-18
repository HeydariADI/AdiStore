import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white font-vazirmatn mt-20">
      {/* بخش بالا */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ستون ۱ - لوگو و توضیح */}
        <div className="space-y-4 ">
          <img
            src="/images/logo/logo4.png"
            alt="Adistor Logo"
            className="w-28 h-28 object-contain bg-transparent"
          />
          <p className="text-gray-300 text-sm leading-6">
            ادی‌استور، تجربه‌ای هوشمند از خرید دیجیتال. ما بهترین محصولات
            دیجیتال را با گارانتی و ارسال سریع ارائه می‌دهیم.
          </p>
        </div>

        {/* ستون ۲ - لینک‌های مفید */}
        <div>
          <h3 className="text-xl font-semibold mb-4">لینک‌های مفید</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/" className="hover:text-orange-400 transition">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-400 transition">
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-orange-400 transition"
              >
                تماس با ما
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-orange-400 transition">
                سبد خرید
              </Link>
            </li>
          </ul>
        </div>

        {/* ستون ۳ - تماس و شبکه‌های اجتماعی */}
        <div>
          <h3 className="text-xl font-semibold mb-4">ارتباط با ما</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-orange-400" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-orange-400" />
              <span>info@adistor.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-orange-400" />
              <span>تهران،خیابان ولیعصر،کوچه دیجیتال</span>
            </li>
          </ul>

          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition"
            >
              <FaTelegram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* بخش پایین */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Adistor — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

export default Footer;
