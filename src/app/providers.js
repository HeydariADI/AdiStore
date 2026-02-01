"use client";

import { SessionProvider } from "next-auth/react";
import CartProvider from "../context/CartContext";
import CartAddModalWrapper from "../components/CartAddModalWrapper";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <CartAddModalWrapper />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
