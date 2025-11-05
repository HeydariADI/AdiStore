import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`font-vazir px-4 py-2 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-orange-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
