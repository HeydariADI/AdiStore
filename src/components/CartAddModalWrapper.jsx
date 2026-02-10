"use client";

import { useCart } from "../context/CartContext";
import CartAddModal from "./CartAddModal.jsx";
import { useEffect } from "react";

export default function CartAddModalWrapper() {
  const { showAddModal, setShowAddModal, addedProduct } = useCart();

  useEffect(() => {
    console.log("CartAddModalWrapper - Modal state:", {
      showAddModal,
      hasProduct: !!addedProduct,
      productTitle: addedProduct?.title,
    });
  }, [showAddModal, addedProduct]);

  useEffect(() => {
    console.log("🔴 ویژگی showAddModal تغییر کرد:", showAddModal);
  }, [showAddModal]);

  if (!showAddModal) {
    console.log("CartAddModalWrapper - not showing (showAddModal is false)");
    return null;
  }

  return (
    <CartAddModal
      show={showAddModal}
      product={addedProduct}
      onClose={() => setShowAddModal(false)}
    />
  );
}
