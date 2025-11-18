import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import CartProvider from "../context/CartContext";
import CartAddModalWrapper from "@/components/CartAddModalWrapper";

export const metadata = {
  title: "AdiStore",
  description: "نمونه پروژه Next.js با فونت فارسی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazirmatn bg-white text-gray-900">
        <CartProvider>
          <CartAddModalWrapper />
          <div className="flex flex-col min-h-screen">
            {/* <AnnouncementBar /> */}
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
