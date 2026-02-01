import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./globals.css";

import Providers from "./providers";

export const metadata = {
  title: "AdiStore",
  description: "نمونه پروژه Next.js با فونت فارسی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazirmatn bg-white text-gray-900">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
