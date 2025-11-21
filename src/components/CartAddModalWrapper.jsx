"use client";

import { useCart } from "../context/CartContext";
import CartAddModal from "../components/CartAddModal";

export default function CartAddModalWrapper() {
  const { showAddModal, setShowAddModal, addedProduct } = useCart();

  if (!showAddModal) return null;

  return (
    <CartAddModal
      show={showAddModal}
      product={addedProduct}
      onClose={() => setShowAddModal(false)}
    />
  );
}
