"use client";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (item) => item._id === action.payload._id,
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };

    default:
      return state;
  }
}

export default function CartProvider(props) {
  const { children = null } = props || {};
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  console.log("🔵 CartProvider - Current showAddModal state:", showAddModal);

  // بارگذاری سبد خرید از localStorage هنگام mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  // Auto-close modal بعد از 3 ثانیه
  useEffect(() => {
    if (showAddModal) {
      console.log("⏱️ Modal باز شد، 3 ثانیه شمارش به عقب شروع شد");
      const timer = setTimeout(() => {
        console.log("⏱️ 3 ثانیه گذشت، modal بسته می‌شود");
        setShowAddModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddModal]);

  // ذخیره سبد خرید در localStorage هر بار که تغییر کند
  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [state.cart]);

  const addToCart = (product) => {
    console.log("✅ addToCart called with:", product);
    if (!product) {
      console.warn("❌ addToCart: product is null/undefined");
      return;
    }
    const normalized = {
      _id: product._id || product.id || product._uid,
      name: product.name || product.title || product.label || "محصول",
      title: product.title || product.name || "محصول",
      price:
        typeof product.price === "number"
          ? product.price
          : parseFloat(product.price) || 0,
      image: product.image || product.img || product.picture || "",
      description: product.description || product.desc || "",
      ...product,
    };

    console.log("📦 Normalized product:", normalized);

    if (!normalized._id) {
      console.warn("❌ Product does not have an _id!", product);
      return;
    }

    console.log("✅ addToCart - dispatching and showing modal:", {
      productId: normalized._id,
      productTitle: normalized.title,
    });

    dispatch({ type: "ADD_TO_CART", payload: normalized });
    setAddedProduct(normalized);
    setShowAddModal(true);

    console.log("✅ Modal state updated! showAddModal should be true now");
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateQuantity = (_id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        showAddModal,
        setShowAddModal,
        addedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
