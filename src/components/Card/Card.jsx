import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-100 p-4 font-vazir ${className}`}>
      {children}
    </div>
  );
}
